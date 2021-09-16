import CONSTANTS from '../../../reference/constants';

// scores
// 1 : green tag
// 0 : no tag
// -1 : red tag

const questions = [
  {
    questionTitle: 'Dans l’ensemble, pensez-vous que votre santé durant les 4 semaines passées était :',
    questionKey: '0',
    resultLabel: 'Santé ressentie',
    answers: [
      {
        content: 'Excellente',
        answerKey: 'very-high',
        score: 1,
        emoji: '🙂',
      },
      {
        content: 'Très bonne',
        answerKey: 'high',
        score: 1,
        emoji: '🙂',
      },
      {
        content: 'Bonne',
        answerKey: 'medium',
        score: 0,
      },
      {
        content: 'Médiocre',
        answerKey: 'low',
        score: -1,
        emoji: '😒',
      },
      {
        content: 'Mauvaise',
        answerKey: 'very-low',
        score: -1,
        emoji: '😒',
      },
    ],
  },
  {
    questionTitle:
      'Au cours de ces 4 dernières semaines, avez-vous été limité dans vos activités physiques habituelles par votre état physique (tel que monter des escaliers, ou marcher) :',
    questionKey: '1',
    resultLabel: 'Activité physique',
    answers: [
      {
        content: 'Pas du tout',
        answerKey: 'not-at-all',
        score: 1,
        emoji: '😌',
      },
      {
        content: 'Un petit peu',
        answerKey: 'slightly',
        score: 1,
        emoji: '😌',
      },
      {
        content: 'Moyennement',
        answerKey: 'moderately',
        score: 0,
      },
      {
        content: 'Beaucoup',
        answerKey: 'a-lot',
        score: -1,
        emoji: '😣',
      },
      {
        content: 'Enormément',
        answerKey: 'very-much',
        score: -1,
        emoji: '😣',
      },
    ],
  },
  {
    questionTitle:
      'Au cours de ces 4 dernières semaines, et en raison de votre état physique, avez-vous été obligé de réduire le temps passé à votre travail ou à vos activités habituelles à la maison et en dehors, à cause de de votre état physique ?',
    questionKey: '2',
    resultLabel: 'Handicap physique',
    answers: [
      {
        content: 'Pas du tout',
        answerKey: 'not-at-all',
        score: 0,
      },
      {
        content: 'Un petit peu',
        answerKey: 'slightly',
        score: 0,
      },
      {
        content: 'Moyennement',
        answerKey: 'moderately',
        score: 0,
      },
      {
        content: 'Beaucoup',
        answerKey: 'a-lot',
        score: -1,
        emoji: '🤕',
      },
      {
        content: 'Enormément',
        answerKey: 'very-much',
        score: -1,
        emoji: '🤕',
      },
    ],
  },
  {
    questionTitle: 'Au cours de ces 4 dernières semaines, quelle a été l’intensité de vos douleurs physiques ?',
    questionKey: '3',
    resultLabel: 'Douleurs physiques',
    answers: [
      {
        content: 'Nulle',
        answerKey: 'none',
        score: 1,
        emoji: '😀',
      },
      {
        content: 'Très faible',
        answerKey: 'not-at-all',
        score: 1,
        emoji: '😀',
      },
      {
        content: 'Faible',
        answerKey: 'slightly',
        score: 0,
      },
      {
        content: 'Moyenne',
        answerKey: 'moderately',
        score: 0,
      },
      {
        content: 'Grande',
        answerKey: 'a-lot',
        score: -1,
        emoji: '😖',
      },
      {
        content: 'Très grande',
        answerKey: 'very-much',
        score: -1,
        emoji: '😖',
      },
    ],
  },
  {
    questionTitle: 'Au cours de ces 4 dernières semaines, quelle quantité d’énergie avez-vous ressenti avoir ?',
    questionKey: '4',
    resultLabel: 'Vitalité',
    answers: [
      {
        content: 'Très grande',
        answerKey: 'very-much',
        score: 1,
        emoji: '🤩',
      },
      {
        content: 'Grande',
        answerKey: 'a-lot',
        score: 1,
        emoji: '🤩',
      },
      {
        content: 'Moyenne',
        answerKey: 'moderately',
        score: 0,
      },
      {
        content: 'Faible',
        answerKey: 'slightly',
        score: 0,
      },
      {
        content: 'Très faible',
        answerKey: 'not-at-all',
        score: -1,
        emoji: '🥱',
      },
      {
        content: 'Nulle',
        answerKey: 'none',
        score: -1,
        emoji: '🥱',
      },
    ],
  },
  {
    questionTitle:
      'Au cours de ces 4 dernières semaines ; y a-t-il eu des moments où votre état de santé ou émotionnel vous a gêné dans votre vie et vos relations avec les autres, votre famille, vos amis, vos connaissances ?',
    questionKey: '5',
    resultLabel: 'Relationnel',
    answers: [
      {
        content: 'Pas du tout',
        answerKey: 'not-at-all',
        score: 1,
        emoji: '🤗',
      },
      {
        content: 'Un petit peu',
        answerKey: 'slightly',
        score: 1,
        emoji: '🤗',
      },
      {
        content: 'Moyennement',
        answerKey: 'moderately',
        score: 0,
      },
      {
        content: 'Beaucoup',
        answerKey: 'a-lot',
        score: -1,
        emoji: '🥺',
      },
      {
        content: 'Enormément',
        answerKey: 'very-much',
        score: -1,
        emoji: '🥺',
      },
    ],
  },
  {
    questionTitle:
      'Au cours de ces 4 dernières semaines, avez-vous été gêné par votre état émotionnel (comme vous sentir triste, nerveux(se) ou irritable) ?',
    questionKey: '6',
    resultLabel: 'Santé psychique',
    answers: [
      {
        content: 'Pas du tout',
        answerKey: 'not-at-all',
        score: 1,
        emoji: '🤓',
      },
      {
        content: 'Un petit peu',
        answerKey: 'slightly',
        score: 1,
        emoji: '🤓',
      },
      {
        content: 'Moyennement',
        answerKey: 'moderately',
        score: 0,
      },
      {
        content: 'Beaucoup',
        answerKey: 'a-lot',
        score: -1,
        emoji: '🤔',
      },
      {
        content: 'Enormément',
        answerKey: 'very-much',
        score: -1,
        emoji: '🤔',
      },
    ],
  },
  {
    questionTitle:
      'Au cours de ces 4 dernières semaines, dans quelle mesure vos problèmes personnels ou votre état émotionnel vous ont-ils empêchés de réaliser votre travail habituel, vos études, ou vos activités quotidiennes ?',
    questionKey: '7',
    resultLabel: 'Frein psychique',
    answers: [
      {
        content: 'Pas du tout',
        answerKey: 'not-at-all',
        score: 0,
      },
      {
        content: 'Un petit peu',
        answerKey: 'slightly',
        score: 0,
      },
      {
        content: 'Moyennement',
        answerKey: 'moderately',
        score: 0,
      },
      {
        content: 'Beaucoup',
        answerKey: 'a-lot',
        score: -1,
        emoji: '😓',
      },
      {
        content: 'Enormément',
        answerKey: 'very-much',
        score: -1,
        emoji: '😓',
      },
    ],
  },
];

export default questions;
