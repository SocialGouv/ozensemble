require("dotenv").config({ path: "./.env" });

const cron = require("node-cron");
const { capture } = require("./third-parties/sentry");

const {
  notificationsCronJob,
  scheduleNotificationsInactivity5DaysCronJob,
  scheduleNotificationsNotFilledWeekCronJob,
  scheduleNotificationsInactivity10DaysCronJob,
  scheduleNotificationPlan,
} = require("./utils/notifications");
const { reminderCronJob } = require("./controllers/reminder");

cron.schedule("* * * * *", async () => {
  // every minute
  await launchCronJob("notifications", notificationsCronJob);
  launchCronJob("reminder", reminderCronJob);
});

cron.schedule("* * * * *", async () => {
  // every minute
  await launchCronJob("test", async () => {
    console.log("test cron job " + new Date());
  });
});

cron.schedule("0 0 4 * * * *", async () => {
  // every day at 4 am, find users with lastConsoAdded = 4 days ago and create a notification for tomorrow (6th day)
  launchCronJob("schedule notifications 5 days inactivity", scheduleNotificationsInactivity5DaysCronJob);
});
cron.schedule("0 0 4 * * * *", async () => {
  // every day at 4 am, find users with lastConsoAdded = 9 days ago and create a notification for tomorrow (11th day)
  launchCronJob("schedule notifications 10 days inactivity", scheduleNotificationsInactivity10DaysCronJob);
});

cron.schedule("0 0 4 * * 1 *", async () => {
  // every monday at 4 am, find users with lastConsoAdded = 7 days ago and create a notification the same day at 6 pm
  launchCronJob("schedule notifications not filled week", scheduleNotificationsNotFilledWeekCronJob);
});

//every day at 19H59  launch the notification plan
// cron.schedule("59 19 * * *", async () => {
//   launchCronJob("schedule notification plan", scheduleNotificationPlan);
// });

const launchCronJob = async (name, job) => {
  try {
    job();
  } catch (e) {
    capture(e, { level: "error", extra: { name } });
  }
};
