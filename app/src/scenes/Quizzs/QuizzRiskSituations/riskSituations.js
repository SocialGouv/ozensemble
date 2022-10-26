import React from 'react';
import TextStyled from '../../../components/TextStyled';

const riskSituations = [
  {
    sectionTitle: 'extérieure',
    answers: [
      {
        answerKey: '1.1',
        content: "Quand je suis frustré(e) ou en colère contre quelqu'un",
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche d’apaisement afin de rester en
            relation avec votre groupe social. Vous cherchez à ne pas en être exclu(e) du fait de votre tempérament (
            <TextStyled bold>motif de conformité</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche de transcender votre émotion
            négative de colère en faisant la fête par exemple. Vous cherchez à vous abrutir, à oublier (
            <TextStyled bold>motif social</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '1.2',
        content: "Quand ma relation avec quelqu'un de mon entourage m'inquiète ou me rend anxieux(se)",
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche de vous conformer au groupe
            social. Vous cherchez à ne pas vous en sentir exclu(e) ou à de gérer avec l’alcool les émotions négatives
            que vous renvoie votre entourage (<TextStyled bold>motif de conformité</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche de vous sentir mieux face à
            une relation à l’autre anxiogène (<TextStyled bold>motif social</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '1.3',
        content: 'Quand ma journée se passe mal : stress, gestion du quotidien, frustration...',
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à la recherche de gestion de votre stress grâce
            à l’alcool. Vous cherchez à pouvoir “tenir” ou ne pas “exploser” (
            <TextStyled bold>motif de conformité</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre tentative de contenir votre émotion
            négative d’anxiété. Vous cherchez à vous abrutir, à oublier (<TextStyled bold>motif social</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '1.4',
        content: "Quand j'ai envie de dire à quelqu'un ce que je pense vraiment",
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche de vous conformer au groupe
            social. Vous cherchez à ne pas vous en sentir exclu(e) et à ne pas faire du mal à l’autre (
            <TextStyled bold>motif de conformité</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche de désinhibition, de sortir de
            vous même pour mieux vous mettre en relation. Par exemple, pour aborder l’autre (
            <TextStyled bold>motif social</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '1.5',
        content: "Quand je suis avec certaines personnes et qu'on veut fêter, s'amuser ou s'évader ensemble",
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer de l’alcool serait liée à votre recherche de vous conformer
            au groupe social. Vous cherchez à ne pas vous en sentir exclu(e) (
            <TextStyled bold>motif de conformité</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à la recherche du plaisir et des situations
            festives (<TextStyled bold>motif social</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '1.6',
        content: "Quand j'ai besoin de courage d'affronter une situation que je redoute",
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche de courage et d’apaisement de
            la tension interne que vous ressentez (<TextStyled bold>motif de conformité</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre tentative de contenir votre émotion
            négative d’anxiété. Vous cherchez à vous donner du courage (<TextStyled bold>motif social</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '1.7',
        content: "Quand on m'annonce une mauvaise nouvelle ou une contrariété",
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche de gestion par l’alcool des
            émotions négatives liées à cette mauvaise nouvelle, afin d’aller moins mal ou d’anesthésier la douleur (
            <TextStyled bold>motif de conformité</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche du plaisir malgré les
            obstacles qui se dressent devant vous. Vous cherchez à vous dépasser (
            <TextStyled bold>motif social</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '1.8',
        content: 'Quand on me propose un verre',
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche de vous conformer au groupe
            social tout en apaisant votre tension interne. Il peut aussi parfois vous sembler plus facile de “vider
            votre sac” ou de parler de vos difficultés si vous êtes alcoolisé (
            <TextStyled bold>motif de conformité</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait liée à votre recherche du plaisir et des situations
            festives. Vous ne souhaitez pas passer pour le rabat joie dans les fêtes (
            <TextStyled bold>motif social</TextStyled>).
          </TextStyled>
        ),
      },
    ],
  },
  {
    sectionTitle: 'intérieure',
    answers: [
      {
        answerKey: '2.1',
        content: 'Quand je suis fâché(e) ou frustré(e) contre moi-même',
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt d’atténuer vos soucis et de mieux gérer vos
            sentiments négatifs (<TextStyled bold>motif de coping / pour oublier ses soucis</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Votre raison de consommer serait plutôt une recherche de sensation interne et de lâcher prise (
            <TextStyled bold>motif de renforcement</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '2.2',
        content: 'Quand je suis triste ou déprimé(e)',
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt d’atténuer vos soucis et de mieux gérer vos
            sentiments négatifs (<TextStyled bold>motif de coping / pour oublier ses soucis</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Votre raison de consommer serait plutôt une recherche de sensation interne et d’oubli (
            <TextStyled bold>motif de renforcement</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '2.3',
        content: 'Quand je suis stressé(e) ou anxieux(se)',
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt l’atténuation de vos soucis et la recherche
            d’une gestion de vos sentiments négatifs (
            <TextStyled bold>motif de coping / pour oublier ses soucis</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Votre raison de consommer serait plutôt une recherche de sensation interne et de lâcher prise (
            <TextStyled bold>motif de renforcement</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '2.4',
        content: 'Quand je ne me sens pas bien physiquement',
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt l’atténuation de vos soucis et la recherche
            d’une anesthésie de vos douleurs physiques (
            <TextStyled bold>motif de coping / pour oublier ses soucis</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Votre raison de consommer serait plutôt une recherche de sensation interne et d’anesthésie de vos douleurs
            physiques (<TextStyled bold>motif de renforcement</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '2.5',
        content: "Quand j'ai de la difficulté à m'endormir",
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt l’atténuation de vos soucis et la recherche
            d’une gestion vos sentiments négatifs (
            <TextStyled bold>motif de coping / pour oublier ses soucis</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt de fuir le sommeil en utilisant l’alcool comme
            un boost ou un remontant (<TextStyled bold>motif de renforcement</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '2.6',
        content: 'Quand je veux me récompenser',
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt de vous offrir une récompense alors que vous
            avez le sentiment que votre situation est difficile (
            <TextStyled bold>motif de coping / pour oublier ses soucis</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Votre raison de consommer serait plutôt la recherche de sensation interne et d’amusement (
            <TextStyled bold>motif de renforcement</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '2.7',
        content: "Quand j'ai des pensées négatives vis-à-vis de moi ou de ma situation",
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt d’atténuer vos soucis et de mieux gérer vos
            sentiments négatifs (<TextStyled bold>motif de coping / pour oublier ses soucis</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Votre raison de consommer serait plutôt une tentative de gérer vos émotions négatives en les remplaçant par
            l’oubli et l’ivresse (<TextStyled bold>motif de renforcement</TextStyled>).
          </TextStyled>
        ),
      },
      {
        answerKey: '2.8',
        content: 'Quand je déguste une boisson alcoolisée dont le goût me plaît particulièrement',
        consommationReasonNegativeEmotion: (
          <TextStyled>
            Dans cette situation, votre raison de consommer serait plutôt initialement pour atténuer vos soucis mais
            elle appelle secondairement à de la culpabilité et des envies de consommer irrépressibles (
            <TextStyled bold>motif de coping / pour oublier ses soucis</TextStyled>).
          </TextStyled>
        ),
        consommationReasonPositiveEmotion: (
          <TextStyled>
            Votre raison de consommer serait plutôt une recherche de sensation interne et d’amusement (
            <TextStyled bold>motif de renforcement</TextStyled>).
          </TextStyled>
        ),
      },
    ],
  },
];

export default riskSituations;
