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
        <TextStyled bold>première étape clé pour faire le point</TextStyled>. L'alcool est très présent dans nos vies,
        parfois plus qu'on ne le pense. Vous pourriez être surpris de votre consommation.
      </>
    ),
    descriptionDone: (
      <>
        <TextStyled bold>Courage ! continuez à remplir vos consommations</TextStyled> tout au long de la journée. Chaque
        jour de la semaine, vous trouverez ici une nouvelle aide pour vous accompagner dans ce point sur 7 jours.
      </>
    ),
    textCTA: 'Comment compter',
    screenCTA: 'DAY_1',
  },
  {
    actionType: 'quizz',
    title: 'Jour 2',
    tagLine: 'Évaluer sa consommation',
    description: (
      <>
        <TextStyled bold>Affinez</TextStyled> votre première évaluation avec un questionnaire plus complet de 12
        questions.
      </>
    ),
    descriptionDone: (
      <>
        <TextStyled bold>Remplissez vos consommations</TextStyled> tout au long de la journée et revenez{' '}
        <TextStyled bold>demain</TextStyled> pour la suite de ce point de 7 jours.
      </>
    ),
    textCTA: 'Passer le test',
    screenCTA: 'DAY_2',
  },
  {
    actionType: 'content',
    title: 'Jour 3',
    tagLine: 'Repérer les signes de sevrage',
    description: (
      <>
        <TextStyled bold>Apprenez à repérer les symptômes de sevrage</TextStyled> nécessitants de consulter votre
        médecin ou un professionel Oz Ensemble.
      </>
    ),
    descriptionDone: (
      <>
        <TextStyled bold>Courage ! continuez à remplir vos consommations</TextStyled> tout au long de la journée. Chaque
        jour de la semaine, vous trouverez ici une nouvelle aide pour vous accompagner dans ce point sur 7 jours.
      </>
    ),
    textCTA: 'Mes conseils réduction',
    screenCTA: 'DAY_3',
  },
  {
    actionType: 'quizz',
    title: 'Jour 4',
    tagLine: 'Évaluer sa qualité de vie',
    description: (
      <>
        <TextStyled bold>Evaluez</TextStyled> votre niveau de qualité de vie et l'impact éventuel de l'alcool sur
        celle-ci.
      </>
    ),
    descriptionDone: (
      <>
        <TextStyled bold>Remplissez vos consommations</TextStyled> tout au long de la journée et revenez{' '}
        <TextStyled bold>demain</TextStyled> pour la suite de ce point de 7 jours.
      </>
    ),
    textCTA: 'Passer le test',
    screenCTA: 'DAY_4',
  },
  {
    actionType: 'content',
    title: 'Jour 5',
    tagLine: 'Comment réduire ?',
    description: (
      <>
        Voici quelques conseils simples pour vous aider à <TextStyled bold>réduire</TextStyled> votre consommation
        d'alcool
      </>
    ),
    descriptionDone: (
      <>
        <TextStyled bold>Courage ! continuez à remplir vos consommations</TextStyled> tout au long de la journée. Chaque
        jour de la semaine, vous trouverez ici une nouvelle aide pour vous accompagner dans ce point sur 7 jours.
      </>
    ),
    textCTA: 'Mes conseils réduction',
    screenCTA: 'DAY_5',
  },
  {
    actionType: 'quizz',
    title: 'Jour 6',
    tagLine: 'Identifier mes motivations à changer',
    description:
      "Vos motivations sont une réelle force pour vous aider à comprendre et réduire votre consommation d'alcool.",
    descriptionDone: (
      <>
        <TextStyled bold>Remplissez vos consommations</TextStyled> tout au long de la journée et revenez{' '}
        <TextStyled bold>demain</TextStyled> pour la suite de ce point de 7 jours.
      </>
    ),
    textCTA: 'Mes motivations à changer',
    screenCTA: 'DAY_6',
  },
  {
    actionType: 'content',
    title: 'Jour 7',
    tagLine: 'Bilan de votre point sur 7 jours',
    description: (
      <>
        <TextStyled bold>Bravo !</TextStyled> Vous avez fait un grand premier pas vers une meilleure connaissance et
        maitrîse de votre consommation d'alcool !
      </>
    ),
    descriptionDone: (
      <>
        <TextStyled bold>Feliciations !</TextStyled> Vous avez fait un grand premier pas. Continuez à remplir vos
        consommations tous les jours et n'hésitez pas à prendre contact avec un professionnel Oz Ensemble.
      </>
    ),
    textCTA: 'Consulter mon bilan',
    screenCTA: 'DAY_7',
  },
];
