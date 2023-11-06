const prisma = require("../src/prisma");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

// Run this script at every time change

// Set dates here :

// DST 2023 -> target all reminders set during daylight saving time, at 2 am : Sun, Mar 26, 2023 to Sun, Oct 29, 2023
const DST_START = "2023-03-26T02:00:00.000Z";
const DST_END = "2023-10-29T02:00:00.000Z";

const getAllRemindersSetDuringDST = async () => {
  console.log("START");
  console.log("DST_START", DST_START);
  console.log("DST_END", DST_END);

  const reminders = await prisma.reminder.findMany({
    where: {
      type: "Daily",
      updatedAt: {
        gte: new Date(DST_START),
        lte: new Date(DST_END),
      },
    },
  });

  console.log("REMINDERS FOUND : ", reminders.length);

  //   convert reminders to UTC+1
  for (const reminder of reminders) {
    const utcTimeHours = reminder.utcTimeHours;

    const utcTimeHoursConverted = (utcTimeHours + 1) % 24;

    await prisma.reminder.update({
      where: { id: reminder.id },
      data: {
        utcTimeHours: utcTimeHoursConverted,
      },
    });
  }

  console.log("DONE");
  process.exit(0);
};

getAllRemindersSetDuringDST();
