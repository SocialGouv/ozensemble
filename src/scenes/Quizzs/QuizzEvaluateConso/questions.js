import CONSTANTS from '../../../reference/constants';

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
    questionTitle: 'À quelle fréquence consommez-vous de l’alcool ?',
    questionKey: '0',
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
    questionTitle: 'Combien de verres d’alcool consommez-vous un jour typique où vous buvez ?',
    questionKey: '1',
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
        content: '7 à 9',
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
    questionTitle: 'À quelle fréquence buvez-vous six verres ou plus lors d’une occasion particulière ?',
    questionKey: '2',
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
  {
    questionTitle:
      'Au cours de l’année écoulée, combien de fois avez-vous constaté que vous n’étiez plus capable de vous arrêter de boire une fois que vous aviez commencé ?',
    questionKey: '3',
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
  {
    questionTitle:
      'Au cours de l’année écoulée, à quelle fréquence le fait d’avoir bu de l’alcool vous a-t-il empêché de faire ce qui était normalement attendu de vous ?',
    questionKey: '4',
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
  {
    questionTitle:
      'Au cours de l’année écoulée, à quelle fréquence, après une période de forte consommation, avez-vous dû boire de l’alcool dès le matin pour vous sentir en forme ?',
    questionKey: '5',
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
  {
    questionTitle:
      'Au cours de l’année écoulée, combien de fois avez-vous eu un sentiment de culpabilité ou des remords après avoir bu ?',
    questionKey: '6',
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
  {
    questionTitle:
      'Au cours de l’année écoulée, combien de fois avez-vous été incapable de vous rappeler ce qui s’était passé la soirée précédente parce que vous aviez bu ?',
    questionKey: '7',
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
  {
    questionTitle: 'Vous êtes-vous blessé ou avez-vous blessé quelqu’un parce que vous aviez bu ?',
    questionKey: '8',
    answers: [
      {
        content: 'Non',
        answerKey: 'no',
        score: 0,
      },
      {
        content: "Oui, mais pas au cours de l'année écoulée",
        answerKey: 'yes-but-not-last-year',
        score: 2,
      },
      {
        content: "Oui, au cours de l'année",
        answerKey: 'yes-last-year',
        score: 4,
      },
    ],
  },
  {
    questionTitle:
      'Un parent, un ami, un médecin ou autre soignant s’est-il inquiété de votre consommation d’alcool ou a-t-il suggéré que vous la réduisiez ?',
    questionKey: '9',
    answers: [
      {
        content: 'Non',
        answerKey: 'no',
        score: 0,
      },
      {
        content: "Oui, mais pas au cours de l'année écoulée",
        answerKey: 'yes-but-not-last-year',
        score: 2,
      },
      {
        content: "Oui, au cours de l'année",
        answerKey: 'yes-last-year',
        score: 4,
      },
    ],
  },
];

export default questions;
