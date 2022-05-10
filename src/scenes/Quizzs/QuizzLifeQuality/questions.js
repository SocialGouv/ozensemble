// scores
// 1 : green tag
// 0 : orange tag
// -1 : red tag

const questions = [
  {
    questionTitle: 'Dans l’ensemble, comment évalueriez-vous votre santé durant les 4 semaines passées ?',
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
        emoji: '😶',
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
      'Au cours de ces 4 dernières semaines, avez-vous été limité dans vos activités physiques habituelles par votre état physique (tel que monter des escaliers, ou marcher) ?',
    questionKey: '1',
    resultLabel: 'Activité physique',
    answers: [
      {
        content: 'Pas du tout',
        answerKey: 'not-at-all',
        score: 1,
        emoji: '💪',
      },
      {
        content: 'Un petit peu',
        answerKey: 'slightly',
        score: 1,
        emoji: '💪',
      },
      {
        content: 'Moyennement',
        answerKey: 'moderately',
        score: 0,
        emoji: '💪',
      },
      {
        content: 'Beaucoup',
        answerKey: 'a-lot',
        score: -1,
        emoji: '💪',
      },
      {
        content: 'Enormément',
        answerKey: 'very-much',
        score: -1,
        emoji: '💪',
      },
    ],
  },
  {
    questionTitle:
      "Au cours des 4 dernières semaines, à quel point avez-vous eu des difficultés à faire votre travail ou vos activités habituelles à la maison et à l'extérieur, en raison de votre état physique ?",
    questionKey: '2',
    resultLabel: 'Handicap physique',
    answers: [
      {
        content: 'Pas du tout',
        answerKey: 'not-at-all',
        score: 1,
        emoji: '🙂',
      },
      {
        content: 'Un petit peu',
        answerKey: 'slightly',
        score: 1,
        emoji: '🙂',
      },
      {
        content: 'Moyennement',
        answerKey: 'moderately',
        score: 0,
        emoji: '😑',
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
        emoji: '😐',
      },
      {
        content: 'Moyenne',
        answerKey: 'moderately',
        score: 0,
        emoji: '😐',
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
    questionTitle: 'Au cours des 4 dernières semaines, comment évalueriez-vous votre niveau d’énergie au global ?',
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
        emoji: '😩',
      },
      {
        content: 'Faible',
        answerKey: 'slightly',
        score: 0,
        emoji: '😩',
      },
      {
        content: 'Très faible',
        answerKey: 'not-at-all',
        score: -1,
        emoji: '😴',
      },
      {
        content: 'Nulle',
        answerKey: 'none',
        score: -1,
        emoji: '😴',
      },
    ],
  },
  {
    questionTitle:
      'Au cours des 4 dernières semaines, à quel point votre santé physique ou vos problèmes émotionnels ont-ils limité vos activités sociales habituelles en famille ou entre amis ?',
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
        emoji: '🙁',
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
      'Au cours des 4 dernières semaines, à quel point avez-vous été dérangé par votre état émotionnel (tel que vous sentir anxieux, déprimé ou irritable) ?',
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
        emoji: '🤨',
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
      "Au cours des 4 dernières semaines, dans quelle mesure des problèmes personnels ou émotionnels vous ont-ils empêché de faire votre travail habituel, vos études ou d'autres activités quotidiennes ?",
    questionKey: '7',
    resultLabel: 'Frein psychique',
    answers: [
      {
        content: 'Pas du tout',
        answerKey: 'not-at-all',
        score: 1,
        emoji: '🙂',
      },
      {
        content: 'Un petit peu',
        answerKey: 'slightly',
        score: 1,
        emoji: '🙂',
      },
      {
        content: 'Moyennement',
        answerKey: 'moderately',
        score: 0,
        emoji: '😥',
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
