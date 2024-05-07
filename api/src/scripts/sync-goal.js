require("dotenv").config({ path: "./.env" });

const dayjs = require("dayjs");
const prisma = require("../prisma");
const { syncAllGoalsWithConsos } = require("../utils/goals");

syncAllGoalsWithConsos("any matomo id", true, true);
