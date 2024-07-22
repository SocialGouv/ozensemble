import { capture } from '../../services/sentry';

export const strategyCatalog = [
  // Feelings
  {
    categoryKey: 'feeling',
    strategyKey: 'preoccupied',
    displayFeed: 'Préoccupé',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'worried',
    displayFeed: 'Inquiet',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'nostalgic',
    displayFeed: 'Nostalgique',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'stressed',
    displayFeed: 'Stressé',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'overexcited',
    displayFeed: 'Surexcité',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'anxious',
    displayFeed: 'Angoissé',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'optimistic',
    displayFeed: 'Optimiste',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'enthusiastic',
    displayFeed: 'Enthousiaste',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'negative',
    displayFeed: 'Négatif',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'unhappy',
    displayFeed: 'Malheureux',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'patient',
    displayFeed: 'Patient',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'discouraged',
    displayFeed: 'Découragé',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'disappointed',
    displayFeed: 'Déçu',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'discontent',
    displayFeed: 'Mécontent',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'aggressive',
    displayFeed: 'Agressif',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'persistent',
    displayFeed: 'Persistant',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'afraid',
    displayFeed: 'Effrayé',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'gloomy',
    displayFeed: 'Morose',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'furious',
    displayFeed: 'Furieux',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'concerned',
    displayFeed: 'Soucieux',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'happy',
    displayFeed: 'Joyeux',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'fearful',
    displayFeed: 'Peureux',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'sad',
    displayFeed: 'Triste',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'irritated',
    displayFeed: 'Enervé',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'surprised',
    displayFeed: 'Surpris',
  },
  {
    categoryKey: 'feeling',
    strategyKey: 'disgusted',
    displayFeed: 'Dégoûté',
  },

  // Triggers
  {
    categoryKey: 'trigger',
    strategyKey: 'alcoholproximity',
    displayFeed: 'Etre à proximité d’alcool',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'work',
    displayFeed: 'Mon Travail',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'oldsouvenirs',
    displayFeed: 'Vieux souvenirs',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'habit',
    displayFeed: 'Habitude',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'school',
    displayFeed: 'Ecole',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'eventcelebration',
    displayFeed: 'Célébration d’un évènement',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'sadness',
    displayFeed: 'Tristesse',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'stress',
    displayFeed: 'Stress',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'seenalcohol',
    displayFeed: 'Avoir vu de l’alcool',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'boredom',
    displayFeed: 'Ennui',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'socialisolation',
    displayFeed: 'Isolation sociale',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'conflict',
    displayFeed: 'Conflit',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'stimuli',
    displayFeed: 'Stimuli',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'depressiveperiod',
    displayFeed: 'Période dépressive',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'happyhour',
    displayFeed: 'Happy Hour',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'familymeal',
    displayFeed: 'Repas de famille',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'anxiousperiod',
    displayFeed: 'Période anxieuse',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'negativeemotionalstate',
    displayFeed: 'Etat émotionnel négatif',
  },
  {
    categoryKey: 'trigger',
    strategyKey: 'positiveemotionalstate',
    displayFeed: 'Etat émotionnel positif',
  },

  // Action plan
  {
    categoryKey: 'actionPlan',
    strategyKey: 'staydistracted',
    displayFeed: 'Rester distrait et occupé',
    redirection: 'RANDOM',
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'meditate',
    displayFeed: 'Pratiquer la méditation',
    redirection: [
      'VIDEO_PLAYER',
      {
        category: 'MEDITATION',
        title: 'Vidéos de méditation',
      },
    ],
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'breathingexercises',
    displayFeed: 'Faire des exercices de respiration',
    redirection: ['CRAVING_BREATH'],
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'journaling',
    displayFeed: 'Tenir un journal de bord',
    redirection: null,
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'watchvideos',
    displayFeed: 'Regarder des vidéos',
    redirection: ['CRAVING_VIDEOS'],
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'exercising',
    displayFeed: 'Faire des exercices',
    redirection: ['EXERCISES_VIDEOS_INDEX'],
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'quicktips',
    displayFeed: 'Suivre des conseils rapides',
    redirection: ['HYDRATION_ADVICE'],
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'listenmusic',
    displayFeed: 'Ecouter de la musique',
    redirection: null,
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'readarticles',
    displayFeed: 'Lire des articles',
    redirection: ['HEALTH_ARTICLE'],
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'talktofriend',
    displayFeed: 'Parler à un ami de confiance',
    redirection: null,
  },
  {
    categoryKey: 'actionPlan',
    strategyKey: 'readtestimonials',
    displayFeed: 'Lire des témoignages',
    redirection: ['TESTIMONIES'],
  },
];

export const intensityLevels = [
  {
    intensity: 0,
    strategyKey: 'verylow',
    displayFeed: 'Envie très faible',
  },
  {
    intensity: 1,
    strategyKey: 'verylow',
    displayFeed: 'Envie très faible',
  },
  {
    intensity: 2,
    strategyKey: 'low',
    displayFeed: 'Envie faible',
  },
  {
    intensity: 3,
    strategyKey: 'low',
    displayFeed: 'Envie faible',
  },
  {
    intensity: 4,
    strategyKey: 'moderate',
    displayFeed: 'Envie modérée',
  },
  {
    intensity: 5,
    strategyKey: 'moderate',
    displayFeed: 'Envie modérée',
  },
  {
    intensity: 6,
    strategyKey: 'considerable',
    displayFeed: 'Envie considérable',
  },
  {
    intensity: 7,
    strategyKey: 'considerable',
    displayFeed: 'Envie considérable',
  },
  {
    intensity: 8,
    strategyKey: 'strong',
    displayFeed: 'Envie forte',
  },
  {
    intensity: 9,
    strategyKey: 'strong',
    displayFeed: 'Envie forte',
  },
  {
    intensity: 10,
    strategyKey: 'veryhigh',
    displayFeed: 'Envie très forte',
  },
];

export const strategyCatalogObject = strategyCatalog.reduce((_strategyCatalogObject, strategy) => {
  _strategyCatalogObject[strategy.strategyKey] = strategy;
  return _strategyCatalogObject;
}, {});

const strategyCategories = [...new Set(strategyCatalog.map(({ categoryKey }) => categoryKey))];

export const strategyKeysByCategory = strategyCategories.reduce((acc, categoryKey) => {
  acc[categoryKey] = strategyCatalog
    .filter((strategy) => strategy.categoryKey === categoryKey)
    .map(({ strategyKey }) => strategyKey);
  return acc;
}, {});

export const getDisplayName = (strategyElementKey, catalogObject) => {
  try {
    const strategyElement = catalogObject[strategyElementKey];
    if (!strategyElement) {
      capture(new Error('strategyElement not found'), {
        extra: { strategyElementKey, catalogObject, function: 'getDisplayName' },
      });
      return '';
    }
    return strategyElement.displayFeed;
  } catch (e) {
    capture(e, { extra: { strategyElementKey, catalogObject, function: 'getDisplayName' } });
    return '';
  }
};
