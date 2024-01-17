const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { superUser90DaysInAppModal, superUser30DaysInAppModal } = require("../utils/super-user-modals");

router.get(
  "/",
  catchErrors(async (req, res) => {
    // test prisma db connection
    const conso = await prisma.consommation.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (conso) {
      return res.send({ ok: true, data: conso?.id });
    }
    return res.send({ ok: false });
  })
);

router.get(
  "/super-user-in-app-modal",
  catchErrors(async (req, res) => {
    console.log("init");
    const modale = req.query?.modale;
    // USER SURVEY:
    if (modale === "super90") {
      console.log("ici");
      return res.status(200).send({
        ok: true,
        showInAppModal: superUser90DaysInAppModal,
      });
    }
    if (modale === "super30") {
      // if the user skipped the 30 days, he will have got the 90 days - if he got the 90 days, we don't show him the 30 days
      return res.status(200).send({
        ok: true,
        showInAppModal: superUser30DaysInAppModal,
      });
    }
    return res.status(200).send({ ok: true });
  })
);
module.exports = router;
