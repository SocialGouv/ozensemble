require("dotenv").config({ path: "./.env" });
const fs = require("fs");

const dayjs = require("dayjs");
const prisma = require("../prisma");
const { grabBadgeFromCatalog } = require("../utils/badges");
const { countMaxConsecutiveDays, getStarsCorrespondingToConsecutiveDays } = require("../utils/drinks");
const { checkCurrentWeekGoal } = require("../utils/goals");

async function syncBadges(fixGoals = false, debug = false) {
  const users = await prisma.user.findMany({
    where: {
      goal_isSetup: true,
    },
    include: {
      consommations: {
        orderBy: { date: "desc" },
      },
      goals: {
        orderBy: { date: "desc" },
      },
    },
    // take: 1000,
  });
  console.log("USERS", users.length);
  let usersWithFuckedUpGoals = {};
  let fuckedUpGoals = 0;
  let usersWithMoreOrLessSuccessThanExpected = {};
  let usersWithNoObjectives = {};
  for (const [index, user] of Object.entries(users)) {
    // log every 100 users
    if (index % 100 === 0) console.log("user", index);
    // if (debug) console.log(JSON.stringify(user, null, 2));
    if (!user.goal_isSetup) {
      usersWithNoObjectives[user.matomo_id] = true;
      continue;
    }
    // 2. check if goals are existing
    const startOfWeeksForDrinks = {};
    for (const conso of user.consommations) {
      const startOfWeek = dayjs(conso.date).utc().startOf("week").format("YYYY-MM-DD");
      startOfWeeksForDrinks[startOfWeek] = startOfWeeksForDrinks[startOfWeek] || [];
      startOfWeeksForDrinks[startOfWeek].push(conso);
    }
    // NOTE: if the user setup the goals, it doesn'tmean he setup for the previous drinks
    // so we don't need to check if the goals are existing for all the drinks
    // (also we don'tknow when the user setup the goals, so we can't know when to start checking the goals)
    // the best we can do is to check the oldest goal,
    // and see if since then there is a goal for every week the user drank
    const startOfWeeksForGoals = {};
    let oldestGoalDate = null;
    let latestGoal = null;
    for (const goal of user.goals) {
      startOfWeeksForGoals[goal.date] = goal;
      if (!oldestGoalDate || goal.date < oldestGoalDate) {
        oldestGoalDate = goal.date;
        if (!latestGoal) {
          latestGoal = goal;
        }
      } else {
        latestGoal = goal;
      }
    }
    usersWithMoreOrLessSuccessThanExpected[user.matomo_id] = 0;
    for (const [startOfWeek, weekConsos] of Object.entries(startOfWeeksForDrinks)) {
      if (debug) console.log("CHECKING GOAL", user.id, startOfWeek, oldestGoalDate);
      if (oldestGoalDate && startOfWeek < oldestGoalDate) {
        continue;
      }
      let goal = startOfWeeksForGoals[startOfWeek];
      let goalIsNew = false;
      if (!goal) {
        if (debug) console.log("NO GOAL", user.id, startOfWeek);
        if (!latestGoal) {
          if (debug) console.log("NO LATEST GOAL", user.id, startOfWeek, oldestGoalDate, startOfWeeksForGoals);
          goal = {
            id: `${user.id}_${startOfWeek}`,
            userId: user.id,
            date: startOfWeek,
            daysWithGoalNoDrink: user.goal_daysWithGoalNoDrink,
            dosesByDrinkingDay: user.goal_dosesByDrinkingDay,
            dosesPerWeek: user.goal_dosesPerWeek,
          };
        } else {
          goal = {
            id: `${user.id}_${startOfWeek}`,
            userId: user.id,
            date: startOfWeek,
            daysWithGoalNoDrink: latestGoal.daysWithGoalNoDrink,
            dosesByDrinkingDay: latestGoal.dosesByDrinkingDay,
            dosesPerWeek: latestGoal.dosesPerWeek,
          };
        }
        goalIsNew = true;
      } else {
        latestGoal = goal;
      }
      /* 3. check if goal is achieved */
      // we isolate this function to make it testable
      const goalCheck = await checkCurrentWeekGoal(goal, weekConsos);

      if (goal.status === "InProgress" && goalCheck.status === null && !goalCheck.weekIsFilledWithConsos) {
        if (debug) console.log("GOAL IN PROGRESS", user.id, startOfWeek);
        continue;
      }
      if (goal.status === "Failure" && goalCheck.status === "Failure") {
        if (debug) console.log("GOAL FAILURE", user.id, startOfWeek);
        continue;
      }
      if (goal.status === "Success" && goalCheck.status === "Success") {
        if (debug) console.log("GOAL SUCCESS", user.id, startOfWeek);
        continue;
      }
      usersWithFuckedUpGoals[user.matomo_id] = true;
      fuckedUpGoals++;
      if (goalIsNew) {
        if (debug) console.log("GOAL NEW", user.id, startOfWeek);
        goal.status = goalCheck.status ?? "InProgress";
        if (goal.status === "Success") usersWithMoreOrLessSuccessThanExpected[user.matomo_id]++;
        if (goal.status === "Failure") usersWithMoreOrLessSuccessThanExpected[user.matomo_id]++;
        if (fixGoals) {
          await prisma.goal.create({
            data: goal,
          });
        }
        continue;
      }
      // now, there is a problem, let's do something about it
      // case 1: because we didn't set `utc`, and because sometimes the `no-conso` date is at 00:00:00,
      // the check for consecutive days is sometimes wrong
      // example: 2021-09-27 00:00:00 is considered to be  2021-09-26, whereas it should stay 2021-09-27
      // because of that, the goal is considered to be failed whereas it should stay in progress
      if (goalCheck.status === null && !goalCheck.weekIsFilledWithConsos && goal.status === "Failure") {
        if (debug) console.log("GOAL FAILURE MISMATCH TO FIX IN PROGRESS", user.id, startOfWeek);
        usersWithMoreOrLessSuccessThanExpected[user.matomo_id]--;
        if (fixGoals) {
          await prisma.goal.update({
            where: { id: goal.id },
            data: { status: "InProgress" },
          });
        }
        continue;
      }
      // because of that, the goal is considered to be in progress whereas it should be failed/success
      if (goalCheck.status === "Failure" && goal.status === "InProgress") {
        if (debug) console.log("GOAL IN PROGRESS MISMATCH TO FIX FAILURE", user.id, startOfWeek);
        usersWithMoreOrLessSuccessThanExpected[user.matomo_id]--;
        if (fixGoals) {
          await prisma.goal.update({
            where: { id: goal.id },
            data: { status: "Failure" },
          });
        }
        continue;
      }
      if (goalCheck.status === "Success" && goal.status === "InProgress") {
        if (debug) console.log("GOAL IN PROGRESS MISMATCH TO FIX SUCCESS", user.id, startOfWeek);
        usersWithMoreOrLessSuccessThanExpected[user.matomo_id]++;
        if (fixGoals) {
          await prisma.goal.update({
            where: { id: goal.id },
            data: { status: "Success" },
          });
        }
        continue;
      }
      // case 2: because there was a bug somehow, sometimes the goal has a wrong status
      if (goalCheck.status === "Failure" && goal.status === "Success") {
        usersWithMoreOrLessSuccessThanExpected[user.matomo_id]--;
        if (debug) console.log("GOAL IN PROGRESS MISMATCH TO FIX FAILURE", user.id, startOfWeek);
        if (fixGoals) {
          await prisma.goal.update({
            where: { id: goal.id },
            data: { status: "Failure" },
          });
        }
        continue;
      }
      if (goalCheck.status === "Success" && goal.status === "Failure") {
        usersWithMoreOrLessSuccessThanExpected[user.matomo_id]++;
        if (debug) console.log("GOAL IN PROGRESS MISMATCH TO FIX SUCCESS", user.id, startOfWeek);
        if (fixGoals) {
          await prisma.goal.update({
            where: { id: goal.id },
            data: { status: "Success" },
          });
        }
        continue;
      }
      if (goalCheck.status === null && goal.status === "Success") {
        usersWithMoreOrLessSuccessThanExpected[user.matomo_id]--;
        if (debug) console.log("GOAL SUCCESS MISMATCH TO FIX IN PROGRESS", user.id, startOfWeek);
        if (fixGoals) {
          await prisma.goal.update({
            where: { id: goal.id },
            data: { status: "InProgress" },
          });
        }
        continue;
      }
      console.log("GOAL MISMATCH", JSON.stringify({ goal, goalCheck }, null, 2));
    }
  }

  console.log("DONE");
  // fs.writeFileSync(
  //   "./users-who-should-have-had-more-success.csv",
  //   Object.entries(usersWithMoreOrLessSuccessThanExpected)
  //     .filter(([matomoId, number]) => number > 0)
  //     .map(([matomoId]) => matomoId)
  //     .join(";\n")
  // );
  // fs.writeFileSync(
  //   "./users-who-should-have-had-more-failures.csv",
  //   Object.entries(usersWithMoreOrLessSuccessThanExpected)
  //     .filter(([matomoId, number]) => number < 0)
  //     .map(([matomoId]) => matomoId)
  //     .join(";\n")
  // );
  // fs.writeFileSync(
  //   "./users-with-objectives-but-not-impacted-with-the-bug.csv",
  //   Object.entries(usersWithMoreOrLessSuccessThanExpected)
  //     .filter(([matomoId, number]) => number === 0)
  //     .map(([matomoId]) => matomoId)
  //     .join(";\n")
  // );
  // fs.writeFileSync(
  //   "./users-with-no-objectives.csv",
  //   Object.entries(usersWithNoObjectives)
  //     .map(([matomoId]) => matomoId)
  //     .join(";\n")
  // );
  console.log({
    usersWithFuckedUpGoals: Object.keys(usersWithFuckedUpGoals).length,
    usersWithMoreSuccessThanExpected: Object.entries(usersWithMoreOrLessSuccessThanExpected).filter(([userId, number]) => number > 0).length,
    usersWithMoreFailureThanExpected: Object.entries(usersWithMoreOrLessSuccessThanExpected).filter(([userId, number]) => number < 0).length,
    usersWithSameShitThanExpected: Object.entries(usersWithMoreOrLessSuccessThanExpected).filter(([userId, number]) => number === 0).length,
    fuckedUpGoals,
  });
}

syncBadges(true, false);
