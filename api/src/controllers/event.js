const express = require("express");
const { catchErrors } = require("../middlewares/errors");
const router = express.Router();

/*
sendInApp example:
[
        "Attention !",
        "Ça ne va pas le faire",
        [
          {
            text: "Pourquoi ?",
            navigate: ["HEALTH"],
          },
          {
            text: "Comment ?",
            navigate: ["CONSO_FOLLOW_UP"],
            style: "destructive",
            event: { category: "IN_APP_CLICK", action: "COMMENT_CLICK" },
          },
        ],
        { cancelable: true },
      ]

*/

router.post(
  "/",
  catchErrors(async (req, res) => {
    const { body } = req;

    // if (body.event.category === "NAVIGATION" && body.event.action === "HEALTH") {
    //   return res.status(200).send({
    //     ok: true,
    //     sendInApp: [
    //       "Attention !",
    //       "Ça ne va pas le faire",
    //       [
    //         {
    //           text: "Pourquoi ?",
    //           navigate: ["HEALTH"],
    //         },
    //         {
    //           text: "Comment ?",
    //           navigate: ["CONSO_FOLLOW_UP"],
    //           style: "destructive",
    //           event: { category: "IN_APP_CLICK", action: "COMMENT_CLICK" },
    //         },
    //       ],
    //       { cancelable: true },
    //     ],
    //   });
    // }
    return res.status(200).send({ ok: true });
  })
);

module.exports = router;
