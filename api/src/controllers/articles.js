const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { badgesCatalog, grabBadgeFromCatalog } = require("../badges");

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { matomoId, articleTitle } = req.body || {};

    if (!matomoId) return res.status(400).json({ ok: false, error: "no matomo id" });

    const user = await prisma.user.upsert({
      where: { matomo_id: matomoId },
      create: {
        matomo_id: matomoId,
        created_from: "Articles",
      },
      update: {},
    });

    await prisma.article.upsert({
      where: { id: `${user.id}_${articleTitle.replaceAll(" ", "")}` },
      create: { id: `${user.id}_${articleTitle.replaceAll(" ", "")}`, userId: user.id, title: articleTitle.replaceAll(" ", "") },
      update: {},
    });

    const list_articles = await prisma.article.findMany({
      where: { userId: user.id },
    });

    const articles_badges = await prisma.badge.findMany({
      where: { userId: user.id, category: "articles" },
    });

    if (list_articles.length === 1 && !articles_badges.find((badge) => badge.stars === 1)) {
      await prisma.badge.create({
        data: { userId: user.id, category: "articles", stars: 1, shown: false },
      });
      return res.status(200).send({ ok: true });
    }

    if (list_articles.length === 2 && !articles_badges.find((badge) => badge.stars === 2)) {
      await prisma.badge.create({
        data: { userId: user.id, category: "articles", stars: 2, shown: false },
      });
      return res.status(200).send({ ok: true });
    }

    if (list_articles.length === 5 && !articles_badges.find((badge) => badge.stars === 3)) {
      await prisma.badge.create({
        data: { userId: user.id, category: "articles", stars: 3, shown: false },
      });
      return res.status(200).send({ ok: true });
    }

    if (list_articles.length === 9 && !articles_badges.find((badge) => badge.stars === 4)) {
      await prisma.badge.create({
        data: { userId: user.id, category: "articles", stars: 4, shown: false },
      });
      return res.status(200).send({ ok: true });
    }

    return res.status(200).send({ ok: true });
  })
);

router.post(
  "/display",
  catchErrors(async (req, res) => {
    const { matomoId } = req.body || {};
    const user = await prisma.user.findUnique({
      where: { matomo_id: matomoId },
    });
    const badge_articles = await prisma.badge.findMany({
      where: { userId: user.id, category: "articles" },
    });

    const badge_articles_to_show = badge_articles.find((badge) => !badge.shown);
    if (badge_articles_to_show) {
      const allBadges = await prisma.badge.findMany({ where: { userId: user.id } });
      await prisma.badge.update({
        where: { id: badge_articles_to_show.id },
        data: { shown: true },
      });
      return res
        .status(200)
        .send({ ok: true, showNewBadge: { newBadge: grabBadgeFromCatalog("articles", badge_articles_to_show.stars), allBadges, badgesCatalog } });
    }
    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
