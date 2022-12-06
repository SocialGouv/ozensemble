const PushNotifications = require("node-pushnotifications");
const { capture } = require("../third-parties/sentry");
const { PUSH_NOTIFICATION_GCM_ID, PUSH_NOTIFICATION_APN_KEY, PUSH_NOTIFICATION_APN_KEY_ID, PUSH_NOTIFICATION_APN_TEAM_ID } = require("../config");
const matomo = require("../third-parties/matomo");

const config = {
  gcm: {
    id: PUSH_NOTIFICATION_GCM_ID,
  },
  apn: {
    token: {
      key: PUSH_NOTIFICATION_APN_KEY,
      keyId: PUSH_NOTIFICATION_APN_KEY_ID,
      teamId: PUSH_NOTIFICATION_APN_TEAM_ID,
    },
  },
};

const NotificationService = new PushNotifications(config);

const sendPushNotification = async ({ matomoId, pushNotifToken, title, body, link, channelId }) => {
  const data = {
    title,
    body,
    topic: "com.addicto.v1",
    android_channel_id: channelId,
    custom: {
      link,
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
        capture(`push notification sent failure: ${results[0].message?.[0]?.errorMsg}`, { extra: { results, data, pushNotifToken } });
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
