require("dotenv").config({ path: "./.env" });
const prisma = require("../prisma");
const { sendPushNotification } = require("../services/push-notifications");

const userId = process.argv[2];

if (!userId) {
  console.error("Please provide a userId as an argument");
  process.exit(1);
}

(async () => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    console.error(`User with id ${userId} not found`);
    process.exit(1);
  }

  console.log({ user });

  const results = await sendPushNotification({
    userId,
    matomoId: user.matomo_id,
    pushNotifToken: user.push_notif_token,
    title: "La notif elle est là",
    body: "This is a test notification",
    data: {
      type: "test",
    },
  });

  console.log(JSON.stringify(results, null, 2));
})();
