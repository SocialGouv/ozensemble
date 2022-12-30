const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const matomo = require("../third-parties/matomo");

router.get(
  "/playstore",
  catchErrors(async (req, res) => {
    await matomo.logEvent({
      category: "QR",
      action: "PLAYSTORE",
      userId: Date.now(), // FIXME: find better userId
    });
    return res
      .writeHead(307, {
        Location: `https://play.google.com/store/apps/details?id=com.addicto`,
      })
      .end();
  })
);

router.get(
  "/appstore",
  catchErrors(async (req, res) => {
    await matomo.logEvent({
      category: "QR",
      action: "APPSTORE",
      userId: Date.now(), // FIXME: find better userId
    });
    return res
      .writeHead(307, {
        Location: `https://apps.apple.com/fr/app/oz-ensemble/id1498190343`,
      })
      .end();
  })
);

module.exports = router;
