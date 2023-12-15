const badgesCatalog = [
  {
    category: 'drinks',
    titleForList: 'Badges jours',
    titleForStatus: 'Jours complétés',
    description:
      "Gagnez ces badges en ajoutant votre consommation d'alcool tous les jours, en effet connaître sa consommation permet déjà de la maitriser\u00A0!",
    bgColor: '#FBD361',
    badges: [
      {
        category: 'drinks',
        title: '1er jour complété',
        reduced_title: '1 jour',
        content: 'Super vous avez complété votre 1er jour\u00A0! Revenez demain pour ajouter le second\u00A0!',
        stars: 1,
        CTATitle: 'Voir mes badges',
        CTANavigation: ['BADGES_LIST'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
        showConfettis: true,
      },
      {
        category: 'drinks',
        title: '3 jours complétés de suite',
        reduced_title: '3 jours',
        content:
          "Félicitations\u00A0! C'est en comptant régulièrement que l'on se rend compte de sa consommation réelle, continuez comme ça\u00A0!",
        stars: 2,
        CTATitle: 'Voir mes badges',
        CTANavigation: ['BADGES_LIST'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
        showConfettis: true,
      },
      {
        title: '7 jours complétés de suite',
        reduced_title: '7 jours',
        content:
          'Bravo de prendre soin de vous\u00A0! Vous allez pouvoir commencer à comparer d’une semaine à l’autre. Donnez-nous votre avis sur Oz Ensemble, nous lisons tous vos messages.',
        stars: 3,
        category: 'drinks',
        CTATitle: 'Donner mon avis',
        CTANavigation: ['NPS_SCREEN', { triggeredFrom: 'After 7 days conso badge' }],
        CTAEvent: {
          category: 'NPS',
          action: 'NPS_OPEN_FROM_MODAL',
          name: 'FROM_7_DAYS_CONSO_BADGE',
        },
        CTAShare: null,
        secondaryButtonTitle: "Partager l'application",
        secondaryButtonEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_7_DAYS_CONSO_BADGE',
        },
        secondaryButtonLink: null,
        secondaryButtonShare: true,
        showConfettis: true,
      },
      {
        title: '14 jours complétés de suite',
        reduced_title: '14 jours',
        content:
          "Toutes nos félicitations pour votre régularité\u00A0! Partagez l'application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
        stars: 4,
        category: 'drinks',
        CTATitle: "Partager l'application",
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_14_DAYS_CONSO_BADGE',
        },
        CTAShare: true,
        secondaryButtonTitle: 'Non merci',
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
        showConfettis: true,
      },
      {
        title: '28 jours complétés de suite',
        reduced_title: '28 jours',
        content:
          'Bravo, déjà 4 semaines complétées\u00A0! Si Oz Ensemble vous a aidé, merci de mettre 5 étoiles, ça nous aiderait beaucoup.',
        stars: 5,
        category: 'drinks',
        CTATitle: "Noter l'application",
        CTARate: true,
        CTAEvent: {
          category: 'RATE_APP',
          action: 'OPEN_FROM_MODAL',
          name: 'FROM_28_DAYS_CONSO_BADGE',
        },
        CTAShare: null,
        secondaryButtonTitle: 'Non merci',
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
    ],
  },
  {
    category: 'locked_drinks',
    badges: [
      {
        category: 'locked_drinks',
        title: '1er jour complété',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir ajouté votre premier jour de consommation\u00A0!',
        stars: 1,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_drinks',
        title: '3 jours complétés de suite',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir ajouté 3 jours de consommation de suite\u00A0!',
        stars: 2,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_drinks',
        title: '7 jours complétés de suite',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir ajouté 7 jours de consommation de suite\u00A0!',
        stars: 3,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_drinks',
        title: '14 jours complétés de suite',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir ajouté 14 jours de consommation de suite\u00A0!',
        stars: 4,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_drinks',
        title: '28 jours complétés de suite',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir ajouté 28 jours de consommation de suite\u00A0!',
        stars: 5,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
    ],
  },
  {
    category: 'share',
    titleForList: 'Badges partages',
    titleForStatus: 'Partages effectués',
    description:
      "Gagnez ces badges en partageant l'application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation\u00A0!",
    bgColor: '#FBD361',
    badges: [
      {
        category: 'share',
        title: '1 partage',
        reduced_title: '1 partage',
        content: "Super, vous avez aidé un proche en lui partageant l'application\u00A0!",
        stars: 1,
        CTATitle: 'Partager à un autre proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_1_SHARE_BADGE',
        },
        CTAShare: true,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
        showConfettis: true,
      },
      {
        category: 'share',
        title: '2 partages',
        reduced_title: '2 partages',
        content:
          "Bravo, continuez à partager l'application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation d'alcool",
        stars: 2,
        CTATitle: 'Partager à un autre proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_2_SHARE_BADGE',
        },
        CTAShare: true,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
        showConfettis: true,
      },
      {
        title: '3 partages',
        reduced_title: '3 partages',
        content: 'Bravo déjà 3 partages à un proche, continuez ainsi\u00A0!',
        stars: 3,
        category: 'share',
        CTATitle: 'Partager à un autre proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_3_SHARE_BADGE',
        },
        CTAShare: true,
        secondaryButtonTitle: null,
        secondaryButtonLink: null,
        showConfettis: true,
      },
      {
        title: '4 partages',
        reduced_title: '4 partages',
        content: "Super, vous avez aidé un 4ème proche en lui partageant l'application\u00A0!",
        stars: 4,
        category: 'share',
        CTATitle: 'Partager à un autre proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_4_SHARE_BADGE',
        },
        CTAShare: true,
        secondaryButtonTitle: null,
        showConfettis: true,
      },
      {
        title: '5 partages',
        reduced_title: '5 partages',
        content:
          'Toutes nos félicitations\u00A0! Si Oz Ensemble vous a aidé, merci de mettre 5 étoiles, ça nous aiderait beaucoup.',
        stars: 5,
        category: 'share',
        CTATitle: "Noter l'application",
        CTAEvent: {
          category: 'RATE_APP',
          action: 'OPEN_FROM_MODAL',
          name: 'FROM_5_SHARE_BADGE',
        },
        CTARate: true,
        secondaryButtonTitle: 'Non merci',
        showConfettis: true,
      },
    ],
  },
  {
    category: 'locked_share',
    badges: [
      {
        category: 'locked_share',
        title: '1 partage',
        reduced_title: '1 partage',
        content: "Remportez ce badge après avoir partagé l'application à un proche\u00A0!",
        stars: 1,
        CTATitle: 'Partage à un proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_1_LOCKED_SHARE_BADGE',
        },
        CTAShare: true,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_share',
        title: '2 partages',
        reduced_title: '2 partages',
        content: "Remportez ce badge après avoir partagé l'application à un deuxième proche\u00A0!",
        stars: 2,
        CTATitle: 'Partager à un autre proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_2_LOCKED_SHARE_BADGE',
        },
        CTAShare: true,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_share',
        title: '3 partages',
        reduced_title: '3 partages',
        content: "Remportez ce badge après avoir partagé l'application à un troisième proche\u00A0!",
        stars: 3,
        CTATitle: 'Partager à un autre proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_3_LOCKED_SHARE_BADGE',
        },
        CTAShare: true,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_share',
        title: '4 partages',
        reduced_title: '4 partages',
        content: "Remportez ce badge après avoir partagé l'application à un quatrième proche\u00A0!",
        stars: 4,
        CTATitle: 'Partager à un autre proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_4_LOCKED_SHARE_BADGE',
        },
        CTAShare: true,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_share',
        title: '5 partages',
        reduced_title: '5 partages',
        content: "Remportez ce badge après avoir partagé l'application à un cinquième proche\u00A0!",
        stars: 5,
        CTATitle: 'Partager à un autre proche',
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_5_LOCKED_SHARE_BADGE',
        },
        CTAShare: true,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
    ],
  },
  {
    category: 'goals',
    titleForList: 'Badges objectifs',
    titleForStatus: 'Objectifs atteints',
    description:
      "Gagnez ces badges en vous fixant votre objectif, puis d'une semaine à l'autre quand votre consommation d'alcool est inférieure à votre objectif\u00A0!",
    bgColor: '#81DBD3',
    badges: [
      {
        title: 'Objectif fixé',
        content:
          "Bravo, vous venez de fixer votre premier objectif, c'est une étape essentielle pour commencer à modifier vos habitudes.",
        stars: 1,
        category: 'goals',
        CTATitle: 'Voir mes badges',
        CTANavigation: ['BADGES_LIST'],
        CTALink: null,
        secondaryButtonTitle: '',
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
      {
        title: '1 semaine réussie',
        content:
          'Bien joué, votre consommation de la semaine dernière est inférieure ou égale à votre objectif, continuez comme ça\u00A0!',
        stars: 2,
        category: 'goals',
        CTATitle: 'Voir mes badges',
        CTANavigation: ['BADGES_LIST'],
        CTALink: null,
        secondaryButtonTitle: '',
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
      {
        title: '2 semaines réussies',
        content:
          "Objectif atteint une 2ème fois, félicitations\u00A0! Partagez l'application à vos proches afin d'atteindre vos objectifs ensemble.",
        stars: 3,
        category: 'goals',
        CTATitle: "Partager l'application",
        CTAShare: true,
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_2_WEEKS_GOAL_BADGE',
        },
        secondaryButtonTitle: 'Non merci',
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
      {
        title: '3 semaines réussies',
        content:
          "Objectif atteint une 3ème semaine, bravo\u00A0! Donnez-nous votre avis sur Oz pour améliorer l'application ensemble, nous lisons tous vos messages.",
        stars: 4,
        category: 'goals',
        CTATitle: 'Donner mon avis',
        CTANavigation: ['NPS_SCREEN', { triggeredFrom: 'After 7 days conso badge' }],
        CTAEvent: {
          category: 'NPS',
          action: 'NPS_OPEN_FROM_MODAL',
          name: 'FROM_3_WEEKS_GOAL_BADGE',
        },
        CTALink: null,
        secondaryButtonTitle: "Partager l'application",
        secondaryButtonEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_3_WEEKS_GOAL_BADGE',
        },
        secondaryButtonLink: '',
        secondaryButtonNavigation: null,
        secondaryButtonShare: true,
        showConfettis: true,
      },
      {
        title: '4 semaines réussies',
        content:
          'Toutes nos félicitations pour ce nouvel objectif atteint\u00A0! Si Oz Ensemble vous a aidé, merci de mettre 5 étoiles, ça nous aiderait beaucoup.',
        stars: 5,
        category: 'goals',
        CTATitle: "Noter l'application",
        CTARate: true,
        CTAEvent: {
          category: 'RATE_APP',
          action: 'OPEN_FROM_MODAL',
          name: 'FROM_4_WEEKS_GOAL_BADGE',
        },
        CTALink: null,
        secondaryButtonTitle: 'Non merci',
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
    ],
  },
  {
    category: 'locked_goals',
    badges: [
      {
        category: 'locked_goals',
        title: 'Objectif fixé',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir fixé votre objectif de consommation\u00A0!',
        stars: 1,
        CTATitle: 'Fixer mon objectif',
        CTANavigation: ['GAINS_ESTIMATE_PREVIOUS_CONSUMPTION'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_goals',
        title: '1 semaine réussie',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir réussi à tenir votre objectif sur une semaine\u00A0!',
        stars: 2,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_goals',
        title: '2 semaines réussies',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir réussi à tenir votre objectif sur une deuxième semaine\u00A0!',
        stars: 3,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_goals',
        title: '3 semaines réussies',
        reduced_title: '1 jour',
        content: 'Remportez ce badge après avoir réussi à tenir votre objectif sur une troisième semaine\u00A0!',
        stars: 4,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
      {
        category: 'locked_goals',
        title: '4 semaines réussies',
        content: 'Remportez ce badge après avoir réussi à tenir votre objectif sur une quatrième semaine\u00A0!',
        stars: 5,
        CTATitle: 'Ajouter une consommation',
        CTANavigation: ['ADD_DRINK'],
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
      },
    ],
  },
  {
    category: 'defis',
    titleForList: 'Badges activités',
    titleForStatus: 'Activités réalisées',
    description:
      'Gagnez ces badges en réalisant l’évaluation de votre consommation, puis en effectuant les 7 jours de l’activité\u00A01.',
    bgColor: '#C79CFF',
    badges: [
      {
        title: 'Evaluation réalisée',
        content:
          "Bravo, vous venez d'évaluer votre niveau de risque. Commencez dès maintenant la 1ère activité qui dure 7 jours pour apprendre à diminuer votre consommation.",
        stars: 1,
        category: 'defis',
        CTATitle: null,
        CTANavigation: null,
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
      {
        title: 'Jour 1 terminé',
        content:
          "Félicitations, vous venez d'apprendre à compter votre consommation. Rendez-vous demain pour découvrir le 2ème jour\u00A0!",
        stars: 2,
        category: 'defis',
        CTATitle: 'Voir mes badges',
        CTANavigation: ['BADGES_LIST'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
      {
        title: 'Jour 2 terminé',
        content:
          "Vous venez d'évaluer plus précisément votre niveau de risque, revenez demain pour découvrir le 3ème jour\u00A0!",
        stars: 3,
        category: 'defis',
        CTATitle: 'Voir mes badges',
        CTANavigation: ['BADGES_LIST'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
      {
        title: 'Jour 3 terminé',
        content:
          "Bien joué\u00A0! Donnez-nous votre avis sur Oz pour améliorer l'application ensemble, nous lisons tous vos messages.",
        stars: 4,
        category: 'defis',
        CTATitle: 'Donner mon avis',
        CTANavigation: ['NPS_SCREEN', { triggeredFrom: 'After 3 days activities badge' }],
        CTAEvent: {
          category: 'NPS',
          action: 'NPS_OPEN_FROM_MODAL',
          name: 'FROM_3_DAYS_ACTIVITIES_BADGE',
        },
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: "Partager l'application",
        secondaryButtonEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_3_DAYS_ACTIVITIES_BADGE',
        },
        secondaryButtonLink: null,
        secondaryButtonShare: true,
        showConfettis: true,
      },
      {
        title: 'Activité 1 terminée',
        content:
          "Félicitations pour cette première activité\u00A0! Partagez l'application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
        stars: 5,
        category: 'defis',
        CTARate: false,
        CTALink: null,
        CTATitle: "Partager l'application",
        CTAShare: true,
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_LAST_ACTIVITIES_BADGE',
        },
        secondaryButtonTitle: 'Non merci',
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
    ],
  },
  {
    category: 'locked_defis',
    bgColor: '#C79CFF',
    badges: [
      {
        title: 'Evaluation réalisée',
        content: 'Remportez ce badge après avoir réalisé votre évaluation de risque de votre consommation.',
        stars: 1,
        category: 'locked_defis',
        CTATitle: 'Réaliser mon évaluation',
        CTANavigation: ['ONBOARDING_QUIZZ'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
      {
        title: 'Jour 1 terminé',
        content: "Remportez ce badge après avoir terminé le premier jour de l'activité 1.",
        stars: 2,
        category: 'locked_defis',
        CTATitle: "Voir l'activité 1",
        CTANavigation: ['DEFI1'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
      {
        title: 'Jour 2 terminé',
        content: "Remportez ce badge après avoir terminé le deuxième jour de l'activité 1.",
        stars: 3,
        category: 'locked_defis',
        CTATitle: "Voir l'activité 1",
        CTANavigation: ['DEFI1'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
      {
        title: 'Jour 3 terminé',
        content: "Remportez ce badge après avoir terminé le troisième jour de l'activité 1.",
        stars: 4,
        category: 'locked_defis',
        CTATitle: "Voir l'activité 1",
        CTANavigation: ['DEFI1'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
      {
        title: 'Activité 1 terminée',
        content: "Remportez ce badge après avoir terminé le septième jour de l'activité 1.",
        stars: 5,
        category: 'locked_defis',
        CTATitle: "Voir l'activité 1",
        CTANavigation: ['DEFI1'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
    ],
  },
  {
    category: 'articles',
    titleForList: 'Badges articles',
    titleForStatus: 'Articles santé lus',
    description:
      'Gagnez ces badges en découvrant les articles de santé écrits pour vous informer et vous motiver dans votre parcours de réduction\u00A0!',
    bgColor: '#FE9933',
    badges: [
      {
        title: '1 article lu',
        content:
          'Bravo, vous venez de lire 1 article, découvrez les autres conseils pour vous informer et vous motiver\u00A0!',
        stars: 1,
        category: 'articles',
        CTATitle: 'Découvrir un autre article',
        CTANavigation: ['HEALTH'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
      {
        title: '2 articles lus',
        content:
          "Félicitations\u00A0! Donnez-nous votre avis sur Oz pour améliorer l'application ensemble, nous lisons tous vos messages.",
        stars: 2,
        category: 'articles',
        CTATitle: 'Donner mon avis',
        CTANavigation: ['NPS_SCREEN', { triggeredFrom: 'After 7 days conso badge' }],
        CTAEvent: {
          category: 'NPS',
          action: 'NPS_OPEN_FROM_MODAL',
          name: 'FROM_2_ARTICLES_BADGE',
        },
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: "Partager l'application",
        secondaryButtonEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_2_ARTICLES_BADGE',
        },
        secondaryButtonLink: null,
        secondaryButtonShare: true,
        showConfettis: true,
      },
      {
        title: '5 articles lus',
        content:
          "Bien joué, vous avez lu plus de la moitié des articles conseils\u00A0! Partagez l'application Oz Ensemble à vos proches qui voudraient aussi réduire leur consommation.",
        stars: 3,
        category: 'articles',
        CTATitle: "Partager l'application",
        CTAEvent: {
          category: 'SHARE_APP',
          action: 'PRESSED_FROM_MODAL',
          name: 'FROM_5_ARTICLES_BADGE',
        },
        CTAShare: true,
        secondaryButtonTitle: 'Non merci',
        secondaryButtonNavigation: null,
        secondaryButtonLink: null,
        showConfettis: true,
      },
      {
        title: '9 articles lus',
        content:
          'Toutes nos félicitations\u00A0! Si Oz Ensemble vous a aidé, merci de mettre 5 étoiles, ça nous aiderait beaucoup.',
        stars: 4,
        category: 'articles',
        CTATitle: "Noter l'application",
        CTARate: true,
        CTAEvent: {
          category: 'RATE_APP',
          action: 'OPEN_FROM_MODAL',
          name: 'FROM_9_ARICLES_BADGE',
        },
        CTAShare: null,
        secondaryButtonTitle: 'Non merci',
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
        showConfettis: true,
      },
    ],
  },
  {
    category: 'locked_articles',
    badges: [
      {
        title: '1 article lu',
        content: 'Remportez ce badge après avoir lu votre premier article\u00A0!',
        stars: 1,
        category: 'locked_articles',
        CTATitle: 'Voir les articles de santé',
        CTANavigation: ['HEALTH'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
      {
        title: '2 articles lus',
        content: 'Remportez ce badge après avoir lu votre deuxième article\u00A0!',
        stars: 2,
        category: 'locked_articles',
        CTATitle: 'Voir les articles de santé',
        CTANavigation: ['HEALTH'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
      {
        title: '5 articles lus',
        content: 'Remportez ce badge après avoir lu votre cinquième article\u00A0!',
        stars: 3,
        category: 'locked_articles',
        CTATitle: 'Voir les articles de santé',
        CTANavigation: ['HEALTH'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
      {
        title: '9 articles lus',
        content: 'Remportez ce badge après avoir lu votre neuvième article\u00A0!',
        stars: 4,
        category: 'locked_articles',
        CTATitle: 'Voir les articles de santé',
        CTANavigation: ['HEALTH'],
        CTARate: false,
        CTALink: null,
        secondaryButtonTitle: null,
        secondaryButtonNavigation: null,
        secondaryButtonLink: '',
      },
    ],
  },
];
