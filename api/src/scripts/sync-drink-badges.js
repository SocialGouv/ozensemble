require("dotenv").config({ path: "./.env" });

const dayjs = require("dayjs");
const prisma = require("../prisma");
const { countMaxConsecutiveDays, getStarsCorrespondingToConsecutiveDays } = require("../utils/drinks");

async function syncBadges(fixBadges = false) {
  const users = await prisma.user.findMany({
    where: {},
    include: {
      badges: {
        orderBy: { stars: "desc" },
      },
      consommations: {
        orderBy: { date: "desc" },
      },
    },
    // take: 1000,
  });
  console.log("USERS", users.length);
  let usersWithBadgeBiggerThan6ThatDontHaveTheBadge = 0;
  for (const [index, user] of Object.entries(users)) {
    // log every 100 users
    if (index % 100 === 0) console.log("user", index);
    // if (debug) console.log(JSON.stringify(user, null, 2));
    // 1. check if drinks badge is correct
    const maxConsecutiveDays = countMaxConsecutiveDays(user.consommations);
    const numberOfStarsForThoseDays = getStarsCorrespondingToConsecutiveDays(maxConsecutiveDays);
    const biggestDrinksBadge = user.badges.find((b) => b.category === "drinks")?.stars;
    if (numberOfStarsForThoseDays > biggestDrinksBadge) {
      // if (debug) console.log("NO GOOD DRINKS STARS", user.id, maxConsecutiveDays, biggestDrinksBadge, numberOfStarsForThoseDays);
      if (numberOfStarsForThoseDays >= 6) {
        usersWithBadgeBiggerThan6ThatDontHaveTheBadge++;
      }
      if (fixBadges) {
        for (let i = biggestDrinksBadge + 1; i <= numberOfStarsForThoseDays; i++) {
          await prisma.badge.create({
            data: {
              userId: user.id,
              category: "drinks",
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
    usersWithBadgeBiggerThan6ThatDontHaveTheBadge,
  });
}

syncBadges(false);
