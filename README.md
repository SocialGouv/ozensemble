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

`./expo/.env.local`
`./expo/.env.production`

Veuillez vous référer à la documentation de React Native et Expo pour le setup de l'environnement et l'installation de XCode / Android Studio

# Lancement de l'application

Lancez d'un côté l'API:

```bash
cd api
yarn install # la première fois pour installer les dépendances
yarn dev
```

Et de l'autre côté l'application:

```bash
cd expo
yarn install # la première fois pour installer les dépendances
```

Parce qu'on utilise des librairies qui ne sont pas supportées dans Expo Go (comme `react-native-mmkv` par exemple, mais quelques autres aussi), nous avons besoin d'utiliser des [développements builds](https://docs.expo.dev/develop/development-builds/introduction/)

```bash
yarn prebuild
```

Normalement, cela devrait créer les dossiers `/ios` et `/android`, qui sont les projets natifs que nous pouvons ouvrir avec XCode et Android Studio.
Cette commande n'est pas à répéter à chaque fois, seulement la première fois. Mais si vous rencontrez des problèmes de compilation, rien ne vous empêche de supprimer ces dossiers et de relancer la commande.

Ensuite vous pouvez lancer l'application

```bash
yarn android # pour Android
yarn ios --simulator="iPhone 15 Pro Max" # pour choisir son émulateur sur IOS
```

# Déployer l'application

Le déploiement d'une app, quel que soit le store (Apple AppStore ou Google Play Store), consiste à
1. compiler l'application, pour avoir un fichier binaire (`.aab` pour Android, `.ipa` pour IOS)
2. uploader ce fichier sur le store
3. soumettre l'application à la revue du store
4. mettre en production une fois la revue passée

Pour les étapes 3 et 4, il faut passer par les stores respectifs, mais pour les étapes 1 et 2, Expo a une CLI qui permet de les faire en une ligne de commande.
Pour l'instant, dans ce projet on utilise seulement l'étape 1, et on fait l'étape 2 en CLI pour Apple, et manuellement pour Google.

Deux options possibles
- compiler sur les serveurs d'Expo (gratuit mais non prioritaire et limité, et si un problème de compilation arrive, on doit le faire localement pour avoir des logs)
- compiler en local (setup plus fastidieux concernant les variables d'environnement et XCode/Android Studio, mais gratuit, prioritaire, plus rapide et plus de contrôle en cas de problème, ce qui arrive parfois)

Dans tous les cas, il vous faut au préalable
- un compte Expo
- installer `npm install -g eas-cli`
- lancer la commande `eas login` pour vous connecter à votre compte Expo

## Incrémentation de la version

Lancez `yarn update-mobile-app-version` pour incrémenter la version de l'application, avec comme options
- `major` pour incrémenter le numéro de version majeur (exemple: de `1.2.3` à `2.0.0`)
- `minor` pour incrémenter le numéro de version mineur (exemple: de `1.2.3` à `1.3.0`)
- `patch` pour incrémenter le numéro de version de correctif (exemple: de `1.2.3` à `1.2.4`)
- `bump` pour incrémenter le numéro de build de `+1` (`buildNumber` de `125` à `126` par exemple)

## Compiler Localement

### Android

- Lancez la commande `cd expo && yarn build-local:android-aab` pour générer un fichier .aab signé
- Le fichier `.aab` se trouvera dans le dossier `./expo`

### IOS

Il vous faut au préalable un compte Apple Developer, enregistré dans l'organisation de l'application.

- Lancez la commande `cd expo && yarn build-local:ios-ipa` pour générer un fichier .ipa signé
- Le fichier `.ipa` se trouvera dans le dossier `./expo`

## Compiler avec Expo EAS

Lancez les commandes adequats
- `yarn build-eas:android-aab` pour Android
- `yarn build-eas:ios` pour IOS
- `yarn build-eas-then-submit:ios` pour soumettre directement sur l'App Store

## Uploader sur les stores manuellement

### Android

- Uploadez le fichier `.aab` sur Google Play Console

### IOS

- Uploadez ce fichier sur App Store Connect grâce à l'application `Transporter` d'Apple, et suivez la procédure décrite par Apple jusqu'à la MEP

## Uploader sur les stores avec la CLI Expo EAS

### IOS

Une fois le fichier `.ipa` construit, lancez la commande `eas submit` et suivez les consignes
Ou bien, pour aller plus vite dès le départ: `yarn build-local-then-submit:ios-ipa`