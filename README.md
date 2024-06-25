# Oz Ensemble

Oz Ensemble est une application développée par des experts formés en addictologie de l'association [CaPASSCité](https://capasscite.fr) avec le soutien de [l'Agence Régionale de Santé d'Ile de France](https://www.iledefrance.ars.sante.fr) et du Ministère de la Santé via la [Fabrique Numérique des Ministères Sociaux](https://www.fabrique.social.gouv.fr).

Site web: https://ozensemble.fabrique.social.gouv.fr

# Où télécharger l'application ?

## IOS

L'application est disponible ici: https://apps.apple.com/us/app/oz-ensemble/id1498190343?ls=1

## Android

L'application est disponible ici: https://play.google.com/store/apps/details?id=com.addicto

# Installation environnement

Fichiers privés à ajouter :

`./api/.env`
`./api/.env.local`
`./app/.env`
`./app/.env.local`
`./app/google-services.json`
`./app/ios/sentry.properties`
`./app/android/sentry.properties`

Veuillez vous référer à la documentation de React Native pour le setup de l'environnement: https://reactnative.dev/docs/set-up-your-environment

# Lancement de l'application

Lancez d'un côté l'API:

```bash
cd api
yarn install # la première fois pour installer les dépendances
yarn dev
```

Et de l'autre côté l'application:

```bash
cd app
yarn install # la première fois pour installer les dépendances
yarn start
```

Le `yarn start`de l'application lancera [Metro](https://reactnative.dev/docs/getting-started-without-a-framework?package-manager=yarn#step-2-start-metro)
De là, vous pourrez lancer l'application sur un émulateur ou un appareil physique.

```bash

                        ▒▒▓▓▓▓▒▒
                     ▒▓▓▓▒▒░░▒▒▓▓▓▒
                  ▒▓▓▓▓░░░▒▒▒▒░░░▓▓▓▓▒
                 ▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓
                 ▓▓░░░░░▒▓▓▓▓▓▓▒░░░░░▓▓
                 ▓▓░░▓▓▒░░░▒▒░░░▒▓▒░░▓▓
                 ▓▓░░▓▓▓▓▓▒▒▒▒▓▓▓▓▒░░▓▓
                 ▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▓▓
                 ▓▓▒░░▒▒▓▓▓▓▓▓▓▓▒░░░▒▓▓
                  ▒▓▓▓▒░░░▒▓▓▒░░░▒▓▓▓▒
                     ▒▓▓▓▒░░░░▒▓▓▓▒
                        ▒▒▓▓▓▓▒▒


warning: the transform cache was reset.
                Welcome to Metro v0.76.8
              Fast - Scalable - Integrated

r - reload the app
d - open developer menu
i - run on iOS
a - run on Android
```

Si vous n'arrivez pas à lancer les émulateurs via cette méthode, ou bien si vous voulez en lancer plusieurs, vous pouvez lancer cette commande dans un terminal séparé:

```bash
yarn android # pour Android
yarn ios --simulator="iPhone 15 Pro Max" # pour choisir son émulateur sur IOS
```

# Déployer l'application

## Android

- Lancez la commande `yarn build:android` pour générer un fichier .aab signé
- Le fichier `.aab` se trouvera dans le dossier `./app/android/app/build/outputs/bundle/release/app-release.aab`
- Uploadez ce fichier sur Google Play Console et suivez la procédure décrite par Google jusqu'à la MEP

## IOS

- Ouvrez le projet dans XCode via la commande `cd app && xed -b ios`
- Dans XCode, allez dans `Product > Archive`
- Uploadez l'archive sur App Store Connect et suivez la procédure décrite par Apple jusqu'à la MEP




