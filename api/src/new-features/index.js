// pointer position:

const pointerHorizontalPositions = ["6%", "27%", "47%", "67%", "94%"];

// "new-[stuff]" : removed in build >=124
module.exports = {
  "new-defis": {
    id: "new-defis-show-again-again",
    position: {
      // top: 0,
      bottom: 0,
      left: 0,
      // right: 0,
    },
    pointerPosition: {
      // top: 0,
      // top: -18,
      bottom: -18,
      left: pointerHorizontalPositions[1],
      // right: 0,
    },
    // styles: {
    //   pointer: {
    //     transform: [{ rotate: '180deg' }],
    //   },
    // },
    // title: 'Regardez ça !',
    description: "Nouveau : faites nos défis pour vous aider à réduire votre consommation",
    okButton: "SUIVANT",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_DEFIS_OK_PRESS" },
    // "onDismissEvent": { "category": "NEW_OPUP", "action": "EVENT_ON_OK_PRESS" }
  },
  "new-articles": {
    id: "new-defis-show-again-and-again",
    position: {
      // top: 0,
      bottom: 0,
      // left: 0,
      right: 0,
    },
    pointerPosition: {
      // top: 0,
      // top: -18,
      bottom: -18,
      left: pointerHorizontalPositions[3],
      // right: 0,
    },
    // styles: {
    //   pointer: {
    //     transform: [{ rotate: '180deg' }],
    //   },
    // },
    // title: 'Regardez ça !',
    description: "Nouveau : plus d'articles pour vous aider dans vos démarches",
    okButton: "FERMER",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_ARTICLES_OK_PRESS" },
    // "onDismissEvent": { "category": "NEW_FEATURE_POPOP", "action": "EVENT_ON_OK_PRESS" }
  },
  gains: {
    id: "new-gains",
    position: {
      bottom: 0,
      left: 0,
    },
    pointerPosition: {
      bottom: -18,
      left: pointerHorizontalPositions[0],
    },
    description: "Ajoutez vos consommations, fixez vous un objectif et évaluez vos gains dans le temps",
    okButton: "OK",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_GAINS_OK_PRESS" },
  },
  defis: {
    id: "new-defis-show-again-again",
    position: {
      // top: 0,
      bottom: 0,
      left: 0,
      // right: 0,
    },
    pointerPosition: {
      // top: 0,
      // top: -18,
      bottom: -18,
      left: pointerHorizontalPositions[1],
      // right: 0,
    },
    // styles: {
    //   pointer: {
    //     transform: [{ rotate: '180deg' }],
    //   },
    // },
    // title: 'Regardez ça !',
    description: "Faites nos défis 7 jours pour vous aider à réduire votre consommation",
    okButton: "OK",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_DEFIS_OK_PRESS" },
    // "onDismissEvent": { "category": "NEW_OPUP", "action": "EVENT_ON_OK_PRESS" }
  },
  suivi: {
    id: "new-suivi",
    position: {
      bottom: 0,
      left: 0,
    },
    pointerPosition: {
      bottom: -18,
      left: pointerHorizontalPositions[2],
    },
    description: "Remplissez votre agenda de consommation et analysez son évolution dans le temps",
    okButton: "OK",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_SUIVI_OK_PRESS" },
  },
  articles: {
    id: "new-defis-show-again-and-again",
    position: {
      // top: 0,
      bottom: 0,
      // left: 0,
      right: 0,
    },
    pointerPosition: {
      // top: 0,
      // top: -18,
      bottom: -18,
      left: pointerHorizontalPositions[3],
      // right: 0,
    },
    // styles: {
    //   pointer: {
    //     transform: [{ rotate: '180deg' }],
    //   },
    // },
    // title: 'Regardez ça !',
    description: "Des articles pour vous aider dans vos démarches",
    okButton: "OK",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_ARTICLES_OK_PRESS" },
    // "onDismissEvent": { "category": "NEW_FEATURE_POPOP", "action": "EVENT_ON_OK_PRESS" }
  },
};
