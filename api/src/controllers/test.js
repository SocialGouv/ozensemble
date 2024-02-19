const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const dayjs = require("dayjs");
const { superUser90DaysInAppModal, superUser30DaysInAppModal } = require("../utils/super-user-modals");
const { scheduleNotificationPlan, notificationsCronJob } = require("../utils/notifications");

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
    if (modale === "super90") {
      console.log("ici");
      return res.status(200).send({
        ok: true,
        showInAppModal: superUser90DaysInAppModal,
      });
    }
    if (modale === "super30") {
      return res.status(200).send({
        ok: true,
        showInAppModal: superUser30DaysInAppModal,
      });
    }
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/test-notif",
  catchErrors(async (req, res) => {
    const { matomoId, type, date } = req.body || {};
    if (!matomoId) {
      return res.status(400).json({ ok: false, error: "no matomo id" });
    }
    try {
      // Assuming userId should be retrieved from the 'users' variable
      let user = await prisma.user.upsert({
        where: { matomo_id: matomoId },
        create: {
          matomo_id: matomoId,
          created_from: "test",
        },
        update: {},
      });

      if (!user) {
        return res.status(404).json({ ok: false, error: "user not found" });
      }

      const userId = user.id;

      const notif = await prisma.notification.create({
        data: {
          user: { connect: { id: userId } },
          type: type ? type : "DEFI1_DAY1",
          date: date ? dayjs(date).toDate() : dayjs().toDate(),
        },
      });

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("Error in /test-notif route:", error);
      return res.status(500).json({ ok: false, error: "internal server error" });
    }
  })
);
router.post(
  "/launch-notification-plan",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};
    if (!matomoId) {
      return res.status(400).json({ ok: false, error: "no matomo id" });
    }
    scheduleNotificationPlan(matomoId);
    return res.status(200).json({ ok: true });
  })
);

module.exports = router;
