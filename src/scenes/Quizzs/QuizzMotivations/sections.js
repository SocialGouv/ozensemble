const sections = [
  {
    sectionTitle: 'Mon bien-être',
    answers: [
      { answerKey: '1.1', content: 'Perdre du poids' },
      { answerKey: '1.2', content: 'Mieux dormir' },
      { answerKey: '1.3', content: "Dépenser moins d'argent" },
    ],
  },
  {
    sectionTitle: 'Ma santé',
    answers: [
      { answerKey: '2.1', content: 'Être en meilleure santé' },
      { answerKey: '2.2', content: 'Prévenir les maladies chroniques' },
      { answerKey: '2.3', content: 'Être moins déprimé' },
      {
        answerKey: '2.4',
        content: 'Ne pas trembler',
        alertText:
          'Votre corps peut être devenu dépendant à l’alcool, cela va se manifester par l’apparition de tremblements, d’une sensation de malaise, d’hallucinations visuelles lorsque vous essayer de réduire seul votre consommation.\n\nContactez au plus vite l’équipe Oz Ensemble ou votre professionnel de santé',
      },
      {
        answerKey: '2.5',
        content: 'Je suis enceinte',
        alertText:
          'L’alcool peut entraîner des conséquences graves lorsqu’il est consommé pendant la grossesse : handicaps mentaux et moteurs, malformations.\n\nContactez au plus vite l’équipe Oz Ensemble ou votre professionnel de santé',
      },
    ],
  },
  {
    sectionTitle: 'Mes relations',
    answers: [
      { answerKey: '3.1', content: 'Avoir des relations plus saines' },
      { answerKey: '3.2', content: 'Rassurer mes proches' },
      { answerKey: '3.3', content: 'Être disponible pour mes enfants' },
    ],
  },
  {
    sectionTitle: 'Mes performances',
    answers: [
      { answerKey: '4.1', content: 'Ne plus avoir la gueule de bois' },
      { answerKey: '4.2', content: 'Être plus performant au travail' },
      { answerKey: '4.3', content: 'Être plus performant dans mes études' },
      { answerKey: '4.4', content: 'Être plus performant dans ma vie intime' },
    ],
  },
  {
    sectionTitle: 'Ma sécurité',
    answers: [
      { answerKey: '5.1', content: 'Ne pas me mettre en danger' },
      { answerKey: '5.2', content: 'Ne pas prendre le volant alcoolisé' },
      { answerKey: '5.3', content: "Ne pas regretter ma soirée d'hier" },
    ],
  },
];

export default sections;
