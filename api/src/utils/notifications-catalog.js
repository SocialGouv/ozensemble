const NOTIFICATIONS_TYPES = {
  DEFI1_DAY1: {
    type: "DEFI1_DAY1",
    title: "C'est l'heure du 2ème jour !",
    body: "Evaluez votre niveau de risque alcool de manière plus fine.",
    link: "oz://APP/TABS/DEFI/DEFI1",
  },
  INACTIVITY_5_DAYS: {
    type: "INACTIVITY_5_DAYS",
    title: "Vous nous manquez",
    body: "Mettez toutes les chances de votre côté en remplissant vos consommations régulièrement 😊",
    link: "oz://APP/ADD_DRINK",
  },
  INACTIVITY_10_DAYS: {
    type: "INACTIVITY_10_DAYS",
    title: "5 sec pour un dernier retour ?",
    body: "Dites nous pourquoi vous êtes partis, ça nous aidera à améliorer l’application",
    link: "oz://INACTIVITY_NPS_SCREEN",
  },
  USER_SURVEY: {
    type: "USER_SURVEY",
    title: "1 min pour améliorer Oz ?",
    body: "Répondez à 6 questions pour nous aider à améliorer l’application ensemble !",
    link: "oz://USER_SURVEY_NOTIF",
  },
  NOT_FILLED_WEEK: {
    type: "NOT_FILLED_WEEK",
    title: "Semaine dernière à compléter",
    body: "N'oubliez pas de remplir tous vos jours pour pouvoir suivre votre objectif hebdo",
    link: "oz://APP/TABS/GAINS_NAVIGATOR/GAINS_MAIN_VIEW",
  },
  FIRST_DAY_COMPLETED: {
    type: "FIRST_DAY_COMPLETED",
    title: "Bravo pour ce 1er jour !",
    body: "Avez-vous d’autres consommations à compléter pour cette journée ?",
    link: "oz://APP/ADD_DRINK",
  },
  FIRST_DAY_NOT_COMPLETED_YET: {
    type: "FIRST_DAY_NOT_COMPLETED_YET",
    title: "C’est l’heure du 1er jour !",
    body: "Ajoutez votre 1er jour pour vous aider à prendre conscience de votre conso",
    link: "oz://APP/ADD_DRINK",
  },
  SECOND_DAY_NOT_COMPLETED_IN_A_ROW: {
    type: "SECOND_DAY_NOT_COMPLETED_IN_A_ROW",
    title: "5 sec pour ajouter votre consommation",
    body: "C’est super rapide et ça vous aidera à vous rendre compte de votre conso !",
    link: "oz://APP/ADD_DRINK",
  },
  THIRD_DAY_NOT_COMPLETED_IN_A_ROW: {
    type: "THIRD_NOT_COMPLETED_IN_A_ROW",
    title: "N’oubliez pas de compléter votre agenda",
    body: "Si vous n’avez rien consommé, vous pouvez l’indiquer",
    link: "oz://APP/ADD_DRINK",
  },
  NOT_COMPLETED_DAY: {
    type: "NOT_COMPLETED_DAY",
    title: "C'est l'heure de votre suivi !",
    body: "N’oubliez pas de remplir votre agenda Oz",
    link: "oz://APP/ADD_DRINK",
  },
  ONE_DAY_LEFT: {
    type: "ONE_DAY_LEFT",
    title: "C’est l’heure du 7ème jour",
    body: "Dernier jour à compléter et vous aurez réussi votre première semaine !",
    link: "oz://APP/ADD_DRINK",
  },
  SECOND_DAY_NOT_COMPLETED_YET: {
    type: "SECOND_DAY_NOT_COMPLETED_YET",
    title: "C’est l’heure du 2ème jour !",
    body: "Félicitations pour hier, ajoutez vos consommations pour cette 2ème journée",
    link: "oz://APP/ADD_DRINK",
  },
  THIRD_DAY_NOT_COMPLETED_YET: {
    type: "THIRD_DAY_NOT_COMPLETED_YET",
    title: "Toc toc toc c’est le 3ème jour",
    body: "Bravo, c’est en comptant tous les jours que l’on se rend compte de sa consommation",
    link: "oz://APP/ADD_DRINK",
  },
  CATCH_UP: {
    type: "CATCH_UP",
    title: "Félicitation pour hier",
    body: "Gardez le rythme et ajoutez vos consommations d’aujourd’hui",
    link: "oz://APP/ADD_DRINK",
  },
  UNLOCKED_BADGES: {
    type: "UNLOCKED_BADGES",
    title: "Vous avez gagné de nouveux badges",
    body: "Découvrez dès maintenant les nouveaux badges que vous avez débloqué sur Oz !",
    link: "oz://APP/BADGES_LIST",
  },
};

module.exports = {
  NOTIFICATIONS_TYPES,
};
