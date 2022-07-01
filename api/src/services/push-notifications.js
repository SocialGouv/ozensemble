const PushNotifications = require("node-pushnotifications");
const { capture } = require("../third-parties/sentry");
// const NotificationsObject = require("../../models/notification");
// const UserObject = require("../../models/user");

const config = {
  // apn: {
  //   token: {
  //     key: process.env.APNS_KEY_P8.replace(/\\n/g, "\n"),
  //     keyId: process.env.APNS_KEY_ID,
  //     teamId: process.env.APNS_TEAM_ID,
  //   },
  //   production: true,
  // },
  gcm: {
    id: process.env.FCM_API_KEY,
  },
  isAlwaysUseFCM: false,
};

console.log({ config });
const NotificationService = new PushNotifications(config);

NotificationService.sendNotifications = function (tokens, data) {
  const payload = {
    topic: process.env.APNS_BUNDLE_ID,
    priority: "high", // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
    // delayWhileIdle: true, // gcm for android - NDLR I don't understand this
    // restrictedPackageName: '', // gcm for android - NDLR I don't understand this
    // dryRun: false, // gcm for android - NDLR I don't understand this
    icon: "", // gcm for android
    // image: '', // gcm for android - for large picture notification
    // style: '', // gcm for android - for large picture notification
    // picture: '', // gcm for android - for large picture notification
    // color: '', // gcm for android - Indicates color of the icon, expressed in #rrggbb format
    // clickAction: '', // gcm for android. In ios, category will be used if not supplied - NDLR High level expertise, I don't understand
    // locKey: '', // gcm, apn  - NDLR High level expertise
    // locArgs: '', // gcm, apn - NDLR High level expertise
    // titleLocKey: '', // gcm, apn - NDLR High level expertise
    // titleLocArgs: '', // gcm, apn - NDLR High level expertise
    retries: 1, // gcm, apn
    // encoding: '', // apn - NDLR High level expertise
    // badge: 2, // gcm for ios, apn
    // sound: 'ping.aiff', // gcm, apn
    // android_channel_id: '', // gcm - Android Channel ID - NDLR High level expertise
    // alert: { // apn, will take precedence over title and body
    // title: 'title',
    // body: 'body'
    // details: https://github.com/node-apn/node-apn/blob/master/doc/notification.markdown#convenience-setters
    // },
    /*
     * A string is also accepted as a payload for alert
     * Your notification won't appear on ios if alert is empty object
     * If alert is an empty string the regular 'title' and 'body' will show in Notification
     */
    // alert: '',
    // launchImage: '', // apn and gcm for ios
    // action: '', // apn and gcm for ios - NDLR High level expertise
    // category: '', // apn and gcm for ios - NDLR High level expertise
    // mdm: '', // apn and gcm for ios. Use this to send Mobile Device Management commands.
    // https://developer.apple.com/library/content/documentation/Miscellaneous/Reference/MobileDeviceManagementProtocolRef/3-MDM_Protocol/MDM_Protocol.html
    // urlArgs: '', // apn and gcm for ios - NDLR High level expertise
    // truncateAtWordEnd: true, // apn and gcm for ios
    // mutableContent: 0, // apn
    pushType: "alert", // apn. valid values are 'alert' and 'background' (https://github.com/parse-community/node-apn/blob/master/doc/notification.markdown#notificationpushtype)
    expiry: Math.floor(Date.now() / 1000) + 28 * 86400, // unit is seconds. if both expiry and timeToLive are given, expiry will take precedence - A UNIX timestamp when the notification should expire. If the notification cannot be delivered to the device, APNS will retry until it expires. An expiry of 0 indicates that the notification expires immediately, therefore no retries will be attempted.
    // timeToLive: 28 * 86400,
    // headers: [], // wns
    // launch: '', // wns
    // duration: '', // wns
    // consolidationKey: 'my notification', // ADM
    sound: "bingbong.aiff",
    ignoreInForeground: false,
    ...data,
  };
  return this.send(tokens, payload);
};

/*
payload: {
  title: String
  body: String
  custom: Object
}

*/

exports.sendPushNotification = async (users = [], payload = {}, admin = false) => {
  try {
    if (payload.custom) payload.custom = { custom: payload.custom };
    if (!payload.title) payload.title = "Oz Ensemble";
    for (let user of users) {
      // if (process.env.NODE_ENV !== "production") continue;
      // payload.badge = ;
      // payload.custom = { custom: { ...(payload.custom || {}), notificationId: notification._id } };
      // payload.notificationId = notification._id;
      console.log(JSON.stringify({ user, payload }, null, 2));
      if (!user.pushTokens) continue;
      await NotificationService.sendNotifications(user.pushTokens, payload)
        .then(async (notifResults) => {
          console.log(JSON.stringify({ notifResults }, null, 2));
          // for (let result of notifResults) {
          //   if (!Boolean(result.failure)) continue;
          //   for (let message of result.message) {
          //     if (message.errorMsg === "BadDeviceToken") {
          //       user.pushTokens = user.pushTokens.filter((token) => token !== message.regId);
          //     }
          //   }
          //   await user.save();
          // }
        })
        .catch((err) => console.log("error sending push", err));
    }
  } catch (e) {
    capture(e, { extra: { users, payload } });
  }
};
