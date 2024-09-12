const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const dayjs = require("dayjs");
const { superUser90DaysInAppModal, superUser30DaysInAppModal, cravingInAppModal } = require("../utils/inAppModals");
const { scheduleNotificationPlan } = require("../utils/notifications");
const { sendPushNotification } = require("../services/push-notifications");
const { authenticateToken } = require("../middlewares/tokenAuth");

router.get(
  "/",
  authenticateToken,
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
  "/in-app-modal",
  authenticateToken,
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
    if (modale === "craving") {
      return res.status(200).send({
        ok: true,
        showInAppModal: cravingInAppModal,
      });
    }
    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/test-notif",
  authenticateToken,
  catchErrors(async (req, res) => {
    const { type, date } = req.body || {};
    const user = req.user;

    try {
      // Assuming userId should be retrieved from the 'users' variable

      const notif = await prisma.notification.create({
        data: {
          user: { connect: { id: user.id } },
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

router.get(
  "/test-notif",
  authenticateToken,
  catchErrors(async (req, res) => {
    const user = req.user;

    if (!user) {
      console.error(`User with id ${userId} not found`);
      process.exit(1);
    }

    const results = await sendPushNotification({
      userId: user.id,
      pushNotifToken: user.push_notif_token,
      title: "La notif elle est là",
      body: "This is a test notification",
      data: {
        type: "test",
      },
    });

    return res.status(200).json({ ok: true, results });
  })
);

router.post(
  "/launch-notification-plan",
  authenticateToken,
  catchErrors(async (req, res) => {
    const user = req.user;
    scheduleNotificationPlan(user.id);
    return res.status(200).json({ ok: true });
  })
);

module.exports = router;
