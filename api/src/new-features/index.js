// pointer position:

const pointerHorizontalPositions = ["6%", "27%", "47%", "67%", "94%"];

module.exports = {
  "new-defis": {
    id: "new-defis",
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
    id: "new-articles",
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
};
