const questions = [
  {
    questionTitle: 'Êtes-vous un homme ou une femme ?',
    questionKey: 'gender-user-survey',
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
    questionTitle: "Quelle est votre tranche d'âge ?",
    questionKey: 'age-user-survey',
    answers: [
      {
        content: 'Moins de 18 ans',
        answerKey: '-18',
        score: 0,
      },
      {
        content: '18 à 25 ans',
        answerKey: '18-25',
        score: 1,
      },
      {
        content: '26 à 35 ans',
        answerKey: '26-35',
        score: 2,
      },
      {
        content: '36 à 45 ans',
        answerKey: '36-45',
        score: 3,
      },
      {
        content: 'Plus de 45 ans',
        answerKey: '+45',
        score: 4,
      },
    ],
  },
  {
    questionTitle:
      'Êtes-vous déjà suivi par un addictologue ou un professionnel de santé pour le suivi de votre consommation d’alcool ?',
    questionKey: 'followup',
    answers: [
      {
        content: 'Par un addictologue',
        answerKey: 'addictologue',
        score: 0,
      },
      {
        content: 'Par un autre professionnel de santé',
        answerKey: 'professionnal',
        score: 1,
      },
      {
        content: 'Non',
        answerKey: 'no',
        score: 2,
      },
    ],
  },
  {
    questionTitle: 'Comment avez-vous connu l’application Oz ensemble ?',
    questionKey: 'referal',
    multipleChoice: true,
    answers: [
      {
        content: 'Via un professionnel de santé',
        answerKey: 'professionnal',
        score: 0,
      },
      {
        content: 'Via un ami ou un proche',
        answerKey: 'friend',
        score: 1,
      },
      {
        content: 'Via l’AppStore ou Android',
        answerKey: 'store',
        score: 2,
      },
      {
        content: 'Via une recherche sur internet',
        answerKey: 'web',
        score: 3,
      },
      {
        content: 'Via les réseaux sociaux',
        answerKey: 'social',
        score: 4,
      },
      {
        content: 'Via une publicité',
        answerKey: 'ads',
        score: 5,
      },
    ],
  },
  {
    questionTitle: 'Pourquoi avez-vous téléchargé Oz Ensemble ?',
    questionKey: 'download',
    multipleChoice: true,
    answers: [
      {
        content: 'Rechercher de l’information',
        answerKey: 'information',
        score: 0,
      },
      {
        content: 'Réaliser une évaluation de ma conso',
        answerKey: 'evaluate',
        score: 1,
      },
      {
        content: 'Réduire ma consommation',
        answerKey: 'reduce',
        score: 2,
      },
      {
        content: 'Arrêter ma consommation',
        answerKey: 'stop',
        score: 3,
      },
      {
        content: 'Contacter un professionnel',
        answerKey: 'contact',
        score: 4,
      },
      {
        content: 'Autre',
        answerKey: 'other',
        score: 5,
      },
    ],
  },
  {
    questionTitle: 'Que faites-vous dans la vie ?',
    questionKey: 'CSP',
    answers: [
      {
        content: 'Etudiant',
        answerKey: 'student',
        score: 0,
      },
      {
        content: 'Agriculteur',
        answerKey: 'agriculteur',
        score: 1,
      },
      {
        content: 'Artisan, commerçant, chef entreprise',
        answerKey: 'artisan',
        score: 2,
      },
      {
        content: 'Cadre et profession intellectuelle sup.',
        answerKey: 'cadre',
        score: 3,
      },
      {
        content: 'Profession intermédiaire',
        answerKey: 'intermediaire',
        score: 4,
      },
      {
        content: 'Employé',
        answerKey: 'employe',
        score: 5,
      },
      {
        content: 'Ouvrier',
        answerKey: 'ouvrier',
        score: 6,
      },
      {
        content: 'Retraité',
        answerKey: 'retraite',
        score: 7,
      },
      {
        content: 'Sans emploi',
        answerKey: 'sans-emploi',
        score: 8,
      },
      {
        content: 'Autre',
        answerKey: 'other',
        score: 9,
      },
    ],
  },
];

export default questions;
