const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();
const prisma = require("../prisma");
const { cocktailsCatalog } = require("../cocktails");

router.get(
  "/cocktails",
  catchErrors(async (req, res) => {
    console.log("cocktailsCatalog", cocktailsCatalog);
    return res.status(200).send({ ok: true, data: cocktailsCatalog });
  })
);

module.exports = router;
