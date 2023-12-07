const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.post(
  "/",
  catchErrors(async (req, res) => {
    const matomoId = req.body?.matomoId;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    console.log(req.body);

    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    //check if it should be deleted

    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
