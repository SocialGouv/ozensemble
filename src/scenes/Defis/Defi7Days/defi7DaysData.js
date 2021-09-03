import React from 'react';

import TextStyled from '../../../components/TextStyled';

export const defi7DaysData = [
  {
    actionType: 'content',
    title: 'Jour 1',
    tagLine: 'Comment compter sa consommation',
    description: (
      <>
        <TextStyled bold>L'observation</TextStyled> est une{' '}
        <TextStyled bold>première étape clé pour faire le point</TextStyled>. L’alcool est très présent dans nos vies,
        parfois plus qu’on ne le pense. Vous pourriez être surpris de boire autant
      </>
    ),
    textCTA: 'Comment compter',
    screenCTA: 'DAY_1',
  },
  {
    actionType: 'quizz',
    title: 'Jour 2',
    tagLine: 'Évaluer sa consommation',
    description: 'Affinez votre première évaluation avec un questionnaire plus complet de 10 questions',
    textCTA: 'Passer le test',
    screenCTA: 'DAY_2',
  },
  {
    actionType: 'content',
    title: 'Jour 3',
    tagLine: 'Saviez-vous que...',
    description:
      'L’alcool facilite l’endormissement mais perturbe la qualité du sommeil en provoquant un sommeil haché par de multiples réveils ?',
  },
  {
    actionType: 'quizz',
    title: 'Jour 4',
    tagLine: 'Évaluer sa qualitée de vie',
    description: "Evaluez votre niveau de qualité de vie et l'impact éventuel de l'alcool sur celle-ci",
    textCTA: 'Passer le test',
    screenCTA: 'DAY_4',
  },
  {
    actionType: 'content',
    title: 'Jour 5',
    tagLine: 'Saviez-vous que...',
    description:
      'L’alcool facilite l’endormissement mais perturbe la qualité du sommeil en provoquant un sommeil haché par de multiples réveils ?',
  },
  {
    actionType: 'quizz',
    title: 'Jour 6',
    tagLine: 'Identifier mes motivations à diminuer',
    description:
      'Identifier mes motivations à changer Vos motivations sont une réelle force pour vous aider à comprendre et réduire votre consommation d’alcool',
    textCTA: 'Mes motivations à diminuer',
    screenCTA: 'DAY_6',
  },
  {
    actionType: 'content',
    title: 'Jour 7',
    tagLine: 'Bilan de votre point sur 7 jours',
    description:
      'Bravo ! Vous avez fait un grand premier pas vers une meilleure connaissance et maitrîse de votre consommation d’alcool !',
    textCTA: 'Consulter mon bilan',
    screenCTA: 'DAY_7',
  },
];
