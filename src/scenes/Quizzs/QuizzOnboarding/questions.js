import CONSTANTS from '../../../reference/constants';

const questions = [
  {
    questionTitle: 'Êtes-vous un homme ou une femme ?',
    questionKey: CONSTANTS.GENDER,
    answers: [
      {
        content: 'Un homme',
        answerKey: 'man',
        score: 0,
      },
      {
        content: 'Une femme',
        answerKey: 'woman',
        score: 1,
      },
    ],
  },
  {
    questionTitle: 'Quelle est la fréquence de votre consommation d’alcool ?',
    questionKey: 'frequency',
    answers: [
      {
        content: 'Jamais',
        answerKey: 'never',
        score: 0,
      },
      {
        content: 'Une fois par mois ou moins',
        answerKey: 'once-a-month',
        score: 1,
      },
      {
        content: '2 à 4 fois par mois',
        answerKey: 'twice-a-month',
        score: 2,
      },
      {
        content: '2 à 3 fois par semaine',
        answerKey: 'twice-a-week',
        score: 3,
      },
      {
        content: 'Au moins 4 fois par semaine',
        answerKey: 'four-times-a-week',
        score: 4,
      },
    ],
  },
  {
    questionTitle: 'Combien de verres contenant de l’alcool consommez-vous un jour typique où vous buvez ?',
    questionKey: 'glasses',
    answers: [
      {
        content: '0 à 2',
        answerKey: 'less-than-three',
        score: 0,
      },
      {
        content: '3 ou 4',
        answerKey: 'three',
        score: 1,
      },
      {
        content: '5 ou 6',
        answerKey: 'five',
        score: 2,
      },
      {
        content: '7 ou 8',
        answerKey: 'seven',
        score: 3,
      },
      {
        content: '10 ou plus',
        answerKey: 'ten',
        score: 4,
      },
    ],
  },
  {
    questionTitle: 'Avec quelle fréquence buvez-vous six verres ou davantage lors d’une occasion particulière ?',
    questionKey: 'binge',
    answers: [
      {
        content: 'Jamais',
        answerKey: 'never',
        score: 0,
      },
      {
        content: 'Moins d’une fois par mois',
        answerKey: 'less-than-once-a-month',
        score: 1,
      },
      {
        content: 'Une fois par mois',
        answerKey: 'more-than-once-a-month',
        score: 2,
      },
      {
        content: 'Une fois par semaine',
        answerKey: 'once-a-week',
        score: 3,
      },
      {
        content: 'Tous les jours ou presque',
        answerKey: 'everyday',
        score: 4,
      },
    ],
  },
];

export default questions;
