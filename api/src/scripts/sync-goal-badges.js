require("dotenv").config({ path: "./.env" });

const dayjs = require("dayjs");
const prisma = require("../prisma");
const { getStarsCorrespondingToGoalsSuccess } = require("../utils/goals");

async function syncBadges(fixBadges = false, skip, take) {
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
    skip,
    take,
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

const skipTakes = [
  [0, 1000],
  [1000, 1000],
  [2000, 1000],
  [3000, 1000],
  [4000, 1000],
  [5000, 1000],
  [6000, 1000],
  [7000, 1000],
  [8000, 1000],
  [9000, 1000],
  [10000, 1000],
  [11000, 1000],
  [12000, 1000],
  [13000, 1000],
  [14000, 1000],
  [15000, 1000],
  [16000, 1000],
  [17000, 1000],
  [18000, 1000],
  [19000, 1000],
  [20000, 1000],
  [21000, 1000],
  [22000, 1000],
  [23000, 1000],
  [24000, 1000],
  [25000, 1000],
  [26000, 1000],
  [27000, 1000],
  [28000, 1000],
  [29000, 1000],
  [30000, 1000],
  [31000, 1000],
  [32000, 1000],
  [33000, 1000],
  [34000, 1000],
  [35000, 1000],
  [36000, 1000],
  [37000, 1000],
  [38000, 1000],
  [39000, 1000],
  [40000, 1000],
];
(async () => {
  for (const [skip, take] of skipTakes) {
    await syncBadges(true, skip, take);
  }
})();
