const questions = [
  {
    questionTitle: 'Êtes-vous un homme ou une femme ?',
    questionKey: 'gender-user-survey',
    answers: [
      {
        content: 'Un homme',
        answerKey: 'man',
      },
      {
        content: 'Une femme',
        answerKey: 'woman',
      },
    ],
  },
  // {
  //   questionTitle: "Quelle est votre tranche d'âge ?",
  //   questionKey: 'age-user-survey',
  //   answers: [
  //     {
  //       content: 'Moins de 18 ans',
  //       answerKey: '-18',
  //     },
  //     {
  //       content: '18 à 25 ans',
  //       answerKey: '18-25',
  //     },
  //     {
  //       content: '26 à 35 ans',
  //       answerKey: '26-35',
  //     },
  //     {
  //       content: '36 à 45 ans',
  //       answerKey: '36-45',
  //     },
  //     {
  //       content: 'Plus de 45 ans',
  //       answerKey: '+45',
  //     },
  //   ],
  // },
  // {
  //   questionTitle:
  //     'Êtes-vous déjà suivi par un addictologue ou un professionnel de santé pour le suivi de votre consommation d’alcool ?',
  //   questionKey: 'followup',
  //   answers: [
  //     {
  //       content: 'Par un addictologue',
  //       answerKey: 'addictologue',
  //       score: 0,
  //     },
  //     {
  //       content: 'Par un autre professionnel de santé',
  //       answerKey: 'professionnal',
  //       score: 1,
  //     },
  //     {
  //       content: 'Non',
  //       answerKey: 'no',
  //       score: 2,
  //     },
  //   ],
  // },
  // {
  //   questionTitle: 'Comment avez-vous connu l’application Oz ensemble ?',
  //   questionKey: 'referal',
  //   answers: [
  //     {
  //       content: 'Via un professionnel de santé',
  //       answerKey: 'professionnal',
  //     },
  //     {
  //       content: 'Via un ami ou un proche',
  //       answerKey: 'friend',
  //     },
  //     {
  //       content: 'Via un professionnel de santé',
  //       answerKey: 'professionnal',
  //     },
  //     {
  //       content: 'Via un professionnel de santé',
  //       answerKey: 'professionnal',
  //     },
  //     {
  //       content: 'Via un professionnel de santé',
  //       answerKey: 'professionnal',
  //     },
  //     {
  //       content: 'Via un professionnel de santé',
  //       answerKey: 'professionnal',
  //     },
  //   ],
  // },
  {
    questionTitle: 'Pourquoi avez-vous téléchargé Oz Ensemble ?',
    questionKey: 'download',
    multipleChoice: true,
    answers: [
      {
        content: 'Rechercher de l’information',
        answerKey: 'information',
      },
      {
        content: 'Réaliser une évaluation de ma conso',
        answerKey: 'evaluate',
      },
    ],
  },
  // {
  //   questionTitle: 'Que faites-vous dans la vie ?',
  //   questionKey: 'CSP',
  //   answers: [
  //     {
  //       content: 'Etudiant',
  //       answerKey: 'student',
  //     },
  //   ],
  // },
];

export default questions;
