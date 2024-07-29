const PushNotifications = require("node-pushnotifications");
const { capture } = require("../third-parties/sentry");
const prisma = require("../prisma");
const {
  PUSH_NOTIFICATION_FIREBASE_SERVICE_ACCOUNT,
  PUSH_NOTIFICATION_GCM_ID,
  PUSH_NOTIFICATION_APN_KEY,
  PUSH_NOTIFICATION_APN_KEY_ID,
  PUSH_NOTIFICATION_APN_TEAM_ID,
} = require("../config");
const matomo = require("../third-parties/matomo");

const getFirebaseConfig = () => {
  try {
    // Assuming PUSH_NOTIFICATION_FIREBASE_SERVICE_ACCOUNT is already a JSON string
    const credentials = JSON.parse(PUSH_NOTIFICATION_FIREBASE_SERVICE_ACCOUNT);

    // Ensure the private_key is properly formatted
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, "\n").trim();
      if (!credentials.private_key.startsWith("-----BEGIN PRIVATE KEY-----")) {
        credentials.private_key = `-----BEGIN PRIVATE KEY-----\n${credentials.private_key}\n-----END PRIVATE KEY-----\n`;
      }
    }

    return credentials;
  } catch (error) {
    capture(error);
    return null;
  }
};

const firebaseConfig = getFirebaseConfig();
// console.log("firebaseConfig", firebaseConfig);

const NotificationService = new PushNotifications({
  gcm: {
    id: PUSH_NOTIFICATION_GCM_ID,
  },
  fcm: {
    appName: "OzEnsemble", // Replace with your actual app name
    serviceAccountKey: firebaseConfig,
    credential: null, // 'firebase-admin' Credential interface
  },
  apn: {
    token: {
      key: PUSH_NOTIFICATION_APN_KEY,
      keyId: PUSH_NOTIFICATION_APN_KEY_ID,
      teamId: PUSH_NOTIFICATION_APN_TEAM_ID,
    },
  },
});

const sendPushNotification = async ({ userId, matomoId, pushNotifToken, title, body, link, channelId, type }) => {
  const data = {
    title,
    body,
    topic: "com.addicto.v1",
    // android_channel_id: channelId,
    custom: {
      link,
      type,
    },
  };
  await matomo.logEvent({
    category: "PUSH_NOTIFICATION_SEND",
    action: "SENDING",
    userId: matomoId,
  });

  try {
    const results = await NotificationService.send([pushNotifToken], data);
    if (results?.length > 0) {
      if (results[0]?.success) {
        await matomo.logEvent({
          category: "PUSH_NOTIFICATION_SEND",
          action: "SUCCESS",
          userId: matomoId,
        });
      } else if (results[0]?.failure) {
        const error = results[0].message?.[0]?.errorMsg;
        if (error === "Requested entity was not found") {
          // https://stackoverflow.com/a/56218146/5225096
          await prisma.user.upsert({
            where: { matomo_id: matomoId },
            update: {
              push_notif_token: null,
            },
          });
          return { ok: false, results };
        } else if (error === "apn write timeout") {
          // just ignore, even Google know nothing about it
          return { ok: false, results };
        }
        capture(`push notification sent failure: ${results[0].message?.[0]?.errorMsg}`, {
          extra: { results, data, pushNotifToken },
          user: {
            id: matomoId,
          },
        });

        await matomo.logEvent({
          category: "PUSH_NOTIFICATION_SEND",
          action: "FAILED",
          name: results[0].message?.[0]?.errorMsg,
          userId: matomoId,
        });
        return { ok: false, results };
      }
    }
    return { ok: true, results };
  } catch (error) {
    capture(error, { extra: { message: "push notification sent error", data } });
    await matomo.logEvent({
      category: "PUSH_NOTIFICATION_SEND",
      action: "ERROR",
      userId: matomoId,
    });
    return { ok: false, error };
  }
};

module.exports = {
  sendPushNotification,
};
