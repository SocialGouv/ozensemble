const MINIMUM_MOBILE_APP_VERSION = 273;

module.exports = ({ headers: { appversion, appdevice } }, res, next) => {
  if (appdevice && !appversion) return res.status(403).send({ ok: false, sendInApp: ["Veuillez mettre à jour votre application!"] });
  if (appdevice && Number(appversion) < MINIMUM_MOBILE_APP_VERSION) {
    const iosLink = "https://apps.apple.com/fr/app/oz-ensemble/id1498190343";
    const androidLink = "https://play.google.com/store/apps/details?id=com.addicto";

    return res.status(403).send({
      ok: false,
      sendInApp: [
        "Votre application n'est pas à jour !",
        `Vous pouvez la mettre à jour en cliquant sur le lien ci-dessous ou en vous rendant sur ${appdevice === "ios" ? iosLink : androidLink}`,
        [{ text: "Mettre à jour", link: appdevice === "ios" ? iosLink : androidLink }],
        { cancelable: true },
      ],
    });
  }
  return next();
};
