const MINIMUM_MOBILE_APP_VERSION = [1, 6, 0];

module.exports = ({ headers: { appversion } }, res, next) => {
  if (!appversion) return res.status(403).send({ ok: false, sendInApp: ["Veuillez mettre à jour votre application!"] });

  const appVer = appversion.split(".").map((d) => parseInt(d));

  for (let i = 0; i < 3; i++) {
    if (appVer[i] > MINIMUM_MOBILE_APP_VERSION[i]) {
      return next();
    } else if (appVer[i] < MINIMUM_MOBILE_APP_VERSION[i]) {
      return res.status(403).send({ ok: false, message: "Veuillez mettre à jour votre application!" });
    }
  }

  next();
};
