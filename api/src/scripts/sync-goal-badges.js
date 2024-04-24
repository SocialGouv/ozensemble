require("dotenv").config({ path: "./.env" });

const dayjs = require("dayjs");
const prisma = require("../prisma");
const { getStarsCorrespondingToGoalsSuccess } = require("../utils/goals");

async function syncBadges(fixBadges = false) {
  const users = await prisma.user.findMany({
    where: {
      goal_isSetup: true,
    },
    include: {
      badges: {
        orderBy: { stars: "desc" },
      },
      goals: {
        where: {
          status: "Success",
        },
      },
    },
    orderBy: {
      matomo_id: "asc",
    },
    take: 50,
    skip: 0,
  });
  console.log("USERS", users.length);
  let usersThatDontHaveTheBadge = 0;
  for (const [index, user] of Object.entries(users)) {
    // log every 100 users
    if (index % 100 === 0) console.log("user", index);
    // if (debug) console.log(JSON.stringify(user, null, 2));
    // 1. check if drinks badge is correct

    const numberOfStarsForThoseGoals = getStarsCorrespondingToGoalsSuccess(user.goals.length);
    const biggestDrinksBadge = user.badges.find((b) => b.category === "goals")?.stars;
    if (numberOfStarsForThoseGoals > biggestDrinksBadge) {
      // if (debug) console.log("NO GOOD DRINKS STARS", user.id, maxConsecutiveDays, biggestDrinksBadge, numberOfStarsForThoseGoals);
      usersThatDontHaveTheBadge++;
      if (fixBadges) {
        for (let i = biggestDrinksBadge + 1; i <= numberOfStarsForThoseGoals; i++) {
          await prisma.badge.create({
            data: {
              userId: user.id,
              category: "goals",
              date: dayjs().format("YYYY-MM-DD"),
              stars: i,
              shown: true,
            },
          });
        }
      }
    }
  }

  console.log("DONE");
  console.log({
    usersThatDontHaveTheBadge,
  });
}

syncBadges(false);
