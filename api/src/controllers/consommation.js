const { previousDay } = require("date-fns");
const { setWeekWithOptions } = require("date-fns/fp");
const dayjs = require("dayjs");
const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");

router.post(
  "/:matomoId",
  catchErrors(async (req, res) => {
    const { matomoId } = req.params;
    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });
    const name = req.body.drinkKey;
    const quantity = req.body.quantity;
    const date = req.body.date;
    const doses = req.body.doses;
    const conso_id = req.body.id;

    // find user with matomoId
    let user = await prisma.user.findUnique({ where: { matomo_id: matomoId } });
    // create / update conso
    await prisma.consommation.upsert({
      where: { id: conso_id },
      update: {
        drinkName: name,
        quantity: quantity,
        userId: user.id,
        alcoolVolume: doses,
        date: dayjs(date).format(),
      },
      create: {
        drinkName: name,
        quantity: quantity,
        userId: user.id,
        alcoolVolume: doses,
        date: dayjs(date).format(),
        id: conso_id,
      },
    });

    // check if new badge or not
    // check if all badges
    // get all the consos ordered by dates, check consecutive days, check if enough for to get a new badge
    const drinksBadges = await prisma.badge.findMany({ where: { userId: user.id, category: "DRINKS" } });
    // if badge 1 day is not present
    // handle 1 day

    if (!drinksBadges.find((badge) => badge["stars"] === 1)) {
      const badge = await prisma.badge.create({
        data: {
          userId: user.id,
          category: "DRINKS",
          stars: 1,
        },
      });
      return res.status(200).send({ ok: true, showNewBadge: badge });
    }

    // if badge 3 day is not present
    // handle 3 days
    if (!drinksBadges.find((badge) => badge["stars"] === 2)) {
      const enoughConsecutiveDays = await checksConsecutiveDays(3, user.id);
      if (enoughConsecutiveDays) {
        const badge = await prisma.badge.create({
          data: {
            userId: user.id,
            category: "DRINKS",
            stars: 2,
          },
        });

        return res.status(200).send({ ok: true, showNewBadge: badge });
      }
    }

    // if badge 7 day is not present
    // handle 7 days
    if (!drinksBadges.find((badge) => badge["stars"] === 3)) {
      const enoughConsecutiveDays = await checksConsecutiveDays(7, user.id);
      if (enoughConsecutiveDays) {
        const badge = await prisma.badge.create({
          data: {
            userId: user.id,
            category: "DRINKS",
            stars: 3,
          },
        });

        return res.status(200).send({ ok: true, showNewBadge: badge });
      }
    }
    // if badge 14 day is not present
    // handle 14 days
    if (!drinksBadges.find((badge) => badge["stars"] === 4)) {
      const enoughConsecutiveDays = await checksConsecutiveDays(14, user.id);

      if (enoughConsecutiveDays) {
        const badge = await prisma.badge.create({
          data: {
            userId: user.id,
            category: "DRINKS",
            stars: 4,
          },
        });

        return res.status(200).send({ ok: true, showNewBadge: badge });
      }
    }

    // if badge 28 day is not present
    // handle 28 days
    if (!drinksBadges.find((badge) => badge["stars"] === 5)) {
      const enoughConsecutiveDays = await checksConsecutiveDays(28, user.id);
      if (enoughConsecutiveDays) {
        const badge = await prisma.badge.create({
          data: {
            userId: user.id,
            category: "DRINKS",
            stars: 5,
          },
        });

        return res.status(200).send({ ok: true, showNewBadge: badge });
      }
    }

    return res.status(200).send({ ok: true });
  })
);

const checksConsecutiveDays = async (consecutiveDaysGoal, userId) => {
  let consecutiveDays = 1;
  let currentConsoDate = dayjs();
  const allConsos = await prisma.consommation.findMany({
    where: { userId: userId },
    orderBy: { date: "desc" },
  });
  let differenceDate;
  let consoDate;
  for (const conso of allConsos) {
    consoDate = dayjs(conso.date);
    differenceDate = currentConsoDate.diff(consoDate, "day");
    if (differenceDate > 1) {
      consecutiveDays = 1;
    }
    if (differenceDate === 1) {
      consecutiveDays++;
    }
    // differenceDate === 1;

    if (consecutiveDays >= consecutiveDaysGoal) {
      return true;
    }
    currentConsoDate = consoDate;
  }
};

module.exports = router;
