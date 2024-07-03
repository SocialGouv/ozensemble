// pointer position:

const pointerHorizontalPositions = ["6%", "27%", "47%", "67%", "94%"];

// "new-[stuff]" : removed in build >=124
module.exports = {
  health: {
    id: "new-health",
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
    description: "Accédez à des activités, des témoignages et des articles de santé",
    okButton: "FERMER",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_HEALTH_OK_PRESS" },
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
    description: "Fixez vous un objectif et évaluez vos gains dans le temps",
    okButton: "OK",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_GAINS_OK_PRESS" },
  },
  craving: {
    id: "new-craving",
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
    description: "Surmontez une envie intense de consommer grâce à des conseils et activités",
    okButton: "OK",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_CRAVING_OK_PRESS" },
    // "onDismissEvent": { "category": "NEW_OPUP", "action": "EVENT_ON_OK_PRESS" }
  },
  calendar: {
    id: "new-calendar",
    position: {
      bottom: 0,
      left: 0,
    },
    pointerPosition: {
      bottom: -18,
      left: pointerHorizontalPositions[2],
    },
    description: "Remplissez votre calendrier tous les jours pour analyser vos consommations dans le temps",
    okButton: "OK",
    onOkEvent: { category: "NEW_FEATURE_POPOP", action: "NEW_CALENDAR_OK_PRESS" },
  },
};
