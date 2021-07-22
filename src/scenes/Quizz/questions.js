import CONSTANTS from '../../reference/constants';

const questions = [
  {
    questionTitle: 'Êtes-vous un homme ou une femme ?',
    questionKey: CONSTANTS.GENDER,
    answers: [
      {
        content: 'Un homme',
        answerKey: CONSTANTS.MAN,
        score: 0,
      },
      {
        content: 'Une femme',
        answerKey: CONSTANTS.WOMAN,
        score: 1,
      },
    ],
  },
  {
    questionTitle: 'Quelle est la fréquence de votre consommation d’alcool ?',
    questionKey: CONSTANTS.FREQUENCY,
    answers: [
      {
        content: 'Jamais',
        answerKey: CONSTANTS.NEVER,
        score: 0,
      },
      {
        content: 'Une fois par mois ou moins',
        answerKey: CONSTANTS.ONCE_A_MONTH,
        score: 1,
      },
      {
        content: '2 à 4 fois par mois',
        answerKey: CONSTANTS.TWICE_A_MONTH,
        score: 2,
      },
      {
        content: '2 à 3 fois par semaine',
        answerKey: CONSTANTS.TWICE_A_WEEK,
        score: 3,
      },
      {
        content: 'Au moins 4 fois par semaine',
        answerKey: CONSTANTS.FOUR_TIMES_A_WEEK,
        score: 4,
      },
    ],
  },
  {
    questionTitle: 'Combien de verres contenant de l’alcool consommez-vous un jour typique où vous buvez ?',
    questionKey: CONSTANTS.GLASSES,
    answers: [
      {
        content: '0 à 2',
        answerKey: CONSTANTS.LESS_THAN_THREE,
        score: 0,
      },
      {
        content: '3 ou 4',
        answerKey: CONSTANTS.THREE,
        score: 1,
      },
      {
        content: '5 ou 6',
        answerKey: CONSTANTS.FIVE,
        score: 2,
      },
      {
        content: '7 ou 8',
        answerKey: CONSTANTS.SEVEN,
        score: 3,
      },
      {
        content: '10 ou plus',
        answerKey: CONSTANTS.TEN,
        score: 4,
      },
    ],
  },
  {
    questionTitle: 'Avec quelle fréquence buvez-vous six verres ou davantage lors d’une occasion particulière ?',
    questionKey: CONSTANTS.BINGE,
    answers: [
      {
        content: 'Jamais',
        answerKey: CONSTANTS.NEVER,
        score: 0,
      },
      {
        content: 'Moins d’une fois par mois',
        answerKey: CONSTANTS.LESS_THAN_ONCE_A_MONTH,
        score: 1,
      },
      {
        content: 'Une fois par mois',
        answerKey: CONSTANTS.MORE_THAN_ONCE_A_MONTH,
        score: 2,
      },
      {
        content: 'Une fois par semaine',
        answerKey: CONSTANTS.ONCE_A_WEEK,
        score: 3,
      },
      {
        content: 'Tous les jours ou presque',
        answerKey: CONSTANTS.EVERYDAY,
        score: 4,
      },
    ],
  },
];

export default questions;
