# Structuration des données

## Choix historiques

Oz Ensemble a été d'abord une application _sans backend_.
Les données métier stockées en "localStorage" étaient les consos.
Pas besoin de connection internet, tout était stocké en local.

Puis est venue la nécessité d'avoir un backend, pour notamment
- gérer les notifications Push, à la place des notifs locales buguées sur quelques modèles de téléphones
- contrôler les numéros de version minimales de l'application supportées
- proposer d'autres UX

De là la question: faut-il supprimer le localStorage et tout stocker en backend ?

Notre choix technique initial (tout en local) s'est en fait avéré être une feature très appréciée des utilisateurs: ils peuvent utiliser Oz même sans connexion internet.

Oz est donc presque une `Local First` app, parce que la plupart des données critiques sont stockées en local, et synchronisées avec le backend.

Détaillons ces données.

## Données métier

### Catalogue de boissons

Il existe
- un `drinksCatalog` qui est une liste de boissons prédéfinies, avec leurs caractéristiques (volume, doses d'alcool, calories, prix)
- un `ownDrinksCatalog` qui est une liste de boissons personnalisées, avec les mêmes caractéristiques
- un `cocktailsCatalog` qui est une liste de cocktails prédéfinis, pour utiliser pour les `ownDrinksCatalog`. On avait choisi de stocker ce dernier en backend, pour pouvoir le mettre à jour sans mise à jour de l'app. Mais finalement cette fonctionnalité n'a pas été utilisée, et on a décidé de le stocker en local.

| Propriété          | Description                      | Local                            | Backend                          |
|--------------------|----------------------------------|----------------------------------|----------------------------------|
| `drinksCatalog`    | liste de boissons prédéfinies    | ✔️                               | ❌                                |
| `ownDrinksCatalog` | liste de boissons personnalisées | ✔️                               | ❌                                |
| `cocktailsCatalog` | liste de cocktails prédéfinis    | `app version <= 1.25.4 ? ❌ : ✔️` | `app version <= 1.25.4 ? ✔️ : ❌` |

### Consos/drinks

Cette donnée est **local first**.
À chaque conso CRUD, on fait les changements localement et instantanément, puis on envoie les changements au backend si possible.
À chaque ouverture de l'app, on réconcilie les consos en attente de synchro (avec `isSyncedWithDB === false`).

| Propriété        | Description                                           | Local                      | Backend                   |
|------------------|-------------------------------------------------------|----------------------------|---------------------------|
| `id`             | identifiant unique                                    | ✔️                         | ✔️                        |
| `drinkKey`       | identifiant de la boisson                             | ✔️                         | ✔️                        |
| `quantity`       | nombre de volumes bus                                 | ✔️                         | ✔️                        |
| `date`           | date de consommation                                  | ✔️                         | ✔️                        |
| `name`           | nom de la boisson                                     | découle du `drinksCatalog` | ✔️ _(pour info et debug)_ |
| `volume`         | volume bu (une pinte de 50cL, un verre de 12cL, etc.) | découle du `drinksCatalog` | ✔️ _(pour info et debug)_ |
| `doses`          | doses d'alcool (en grammes)                           | découle du `drinksCatalog` | ✔️ _(pour info et debug)_ |
| `kcal`           | calories                                              | découle du `drinksCatalog` | ✔️ _(pour info et debug)_ |
| `price`          | prix                                                  | découle du `drinksCatalog` | ✔️ _(pour info et debug)_ |
| `userId`         | identifiant de l'utilisateur en BDD                   | ❌                          | ✔️                        |
| `createdAt`      | utilisation pour BDD                                  | ❌                          | ✔️                        |
| `updatedAt`      | utilisation pour BDD                                  | ❌                          | ✔️                        |
| `isSyncedWithDB` | réconcilitation avec la BDD                           | ✔️                         | ❌                         |

L'ajout des consos influe évidemment sur le status des objectifs.
L'ajout des consos peut générer une attribution de badges.


### Objectifs/goals

Se fixer un objectif, c'est décider de combien de consos on veut boire dans une semaine, et quels jours on s'autorise à boire.
C'est aussi la possibilité de faire évoluer ces objectifs dans le temps, en étant plus ou moins ambitieux semaine après semaine.
Après chaque semaine passée on définit si l'objectif a été atteint ou non, en fonction des consommations.

L'accomplissement des objectifs peut générer une attribution de badges.

Lorsqu'on crée ou MAJ son objectif:
- on enregistre la nouvelle données en local - les consos qu'on s'autorise par semaine, les jours pour lesquels on s'autorise à boire
- on envoie la donnée "compilée" au backend sans détail, pour pouvoir calculer le succès ou non de l'objectif - le nombre de doses par jour et par semaine et les jours autorisés
- le backend renvoie l'ensemble des objectifs de l'utilisateur, pour réconciliation, notamment pour le status de l'objectif (atteint ou non)

#### State global des objectifs

Ainsi
- l'historique et le status des objectifs sont gérés/calculés/stockés en backend (en fonction de l'objectif fixé et des consos)
- ils sont renvoyés à l'app qui les stocke localement aussi pour les afficher (`goalsState`)
- on peut tout de même modifier son objectif, et les futurs, en **local first** (sans connexion internet)


#### Pour chaque objectif

| Propriété               | Description                                 | Local                       | Backend                                                  |
|-------------------------|---------------------------------------------|-----------------------------|----------------------------------------------------------|
| `id`                    | identifiant unique                          | ✔️                          | ✔️                                                       |
| `daysWithGoalNoDrink`   | jours sans consommation autorisés           | ✔️                          | ✔️                                                       |
| `drinksByWeek`          | menu des consos par semaine                 | ✔️                          | ❌ _(seulement la donnée qui en découle, `dosesPerWeek`)_ |
| `previousDrinksPerWeek` | conso d'avant                               | ✔️                          | ❌                                                        |
| `dosesPerWeek`          | doses autorisées par semaine                | découle de `drinksByWeek`   | ✔️                                                       |
| `dosesByDrinkingDay`    | doses autorisées par jour de consommation   | découle des deux précédents | ✔️ _(pour info et debug)_                                |
| `date`                  | date du début de la semaine de cet objectif | _read only_                 | ✔️                                                       |
| `status`                | identifiant de l'utilisateur en BDD         | _read only_                 | ✔️                                                       |
| `userId`                | identifiant de l'utilisateur en BDD         | ❌                           | ✔️                                                       |


### Contexte de Consommation / DrinksContext

À chaque jour de consommation est associé un contexte.
Cette donnée est **local first**.
À chaque conso CRUD, on fait les changements localement et instantanément, puis on envoie les changements au backend si possible.

Nous n'avons pas encore fait de réconciliation de ces données avec le backend, puisque nous n'avons pas encore de besoin métier pour cela.

| Propriété | Description                                             | Local | Backend                  |
|-----------|---------------------------------------------------------|-------|--------------------------|
| `id`      | identifiant unique                                      | ✔️    | ✔️                       |
| `date`    | date de consommation                                    | ✔️    | ✔️                       |
| `context` | contexte de la consommation (liste de tags prédéfinins) | ✔️    | ✔️                       |
| `emotion` | smiley décrivant comment s'est passée la journée        | ✔️    | ✔️                       |
| `note`    | journal de bord de la journée                           | ✔️    | ❌ _(donnée personnelle)_ |


### Rappel / reminder

Les rappels sont des notifications push envoyées à l'utilisateur pour lui rappeler de rentrer ses consos.
Historiquement, c'était une notification locale, gérée localement, mais suite à des bugs sur certains modèles de téléphones, on a décidé de les gérer en backend.
Ainsi,
- un utilisateur choisit l'heure de son rappel, et le jour de la semaine qu'il préfère
- via un cronjob qui tourne chaque minute, le backend envoie une notification push de rappel à l'heure et au jour choisis

| Propriété        | Description                         | Local | Backend |
|------------------|-------------------------------------|-------|---------|
| `id`             | identifiant unique                  | ❌     | ✔️      |
| `userId`         | identifiant de l'utilisateur en BDD | ❌     | ✔️      |
| `type`           | quotidien/hebdomadaire              | ✔️    | ✔️      |
| `utcTimeHours`   | heure du rappel                     | ✔️    | ✔️      |
| `utcTimeMinutes` | minute du rappel                    | ✔️    | ✔️      |
| `utcDaysOfWeek`  | jour du rappel                      | ✔️    | ✔️      |


### Articles

L'application propose plusieurs articles pour aider l'utilisateur à comprendre les mécanismes de l'alcool, les conséquences de la consommation, etc.
On enregistre en backend la lecture de chaque article par l'utilisateur, pour lui faire gagner des badges.

| Propriété        | Description                         | Local | Backend |
|------------------|-------------------------------------|-------|---------|
| `id`             | identifiant unique                  | ❌     | ✔️      |
| `userId`         | identifiant de l'utilisateur en BDD | ❌     | ✔️      |
| `title`          | titre de l'article                  | ✔️    | ✔️      |



### Stratégies face au craving

Les stratégies face au craving sont des outils pour aider l'utilisateur à gérer ses envies de boire.
Elles sont **local first**.
On les enregistre aussi en base de données, bien que le backend n'en ait pas besoin pour le moment.

| Propriété       | Description                                                 | Local | Backend |
|-----------------|-------------------------------------------------------------|-------|---------|
| `id`            | identifiant unique                                          | ❌     | ✔️      |
| `userId`        | identifiant de l'utilisateur en BDD                         | ❌     | ✔️      |
| `strategyIndex` | index de la stratégie dans le catalogue de stratégies       | ✔️    | ✔️      |
| `feelings`      | liste de tags décrivant le craving                          | ✔️    | ✔️      |
| `trigger`       | déclencheur du craving                                      | ✔️    | ✔️      |
| `intensity`     | intensité du craving                                        | ✔️    | ✔️      |
| `actionPlan`    | liste d'actions prédéfinies efficaces pour gérer le craving | ✔️    | ✔️      |

### Défis et Quizzs

Nous ne nous étalerons pas particulièrement sur les défis et les quizzs: bien que le nombre de lignes de code consacré à ces deux éléments soit important, ils ont été relégué à une importance bien moindre dans l'application, parce que peu utilisés par les utilisateurs.

Retenons que toutes les données liées à ces deux éléments sont stockées en **local only**.

### Badges

Les badges sont des récompenses pour l'utilisateur, pour l'encourager à continuer à utiliser l'application.
Ils sont gérés depuis le backend, grâce aux données synchronisées des consos / objectifs / articles / défis / quizzs / partages de l'app.
Sans connexion à internet, on ne peut pas recevoir de nouveau badge.
Néanmoins, on peut toujours voir les badges déjà reçus.

On affiche les badges dans l'app, via le mécanisme d'"in app messages" (c'est-à-dire des modales qu'on affiche à l'utilisateur lorsque l'app est ouverte).
C'est pourquoi la liste des badges est présente en backend, pour pouvoir les renvoyer à l'app.
Mais cette liste est aussi présente en local, pour pouvoir les afficher même sans connexion internet. (On pourrait facilement se passer de cette feature).


| Propriété        | Description                         | Local | Backend |
|------------------|-------------------------------------|-------|---------|
| `id`             | identifiant unique                  | ❌     | ✔️      |
| `userId`         | identifiant de l'utilisateur en BDD | ❌     | ✔️      |
| `category`      | catégorie du badge (consos, objectifs, articles, défis, quizzs, partages) | ❌     | ✔️      |
| `stars`         | nombre d'étoiles du badge           | ❌     | ✔️      |
| `date`         | date d'attribution du badge         | ❌     | ✔️      |
| `shown`        | badge affiché ou non                | ❌     | ✔️      |

## AppMilestone

Les appMilestones sont des "in app messages" (c'est-à-dire des modales qu'on affiche à l'utilisateur lorsque l'app est ouverte) pour lui annoncer des nouveautés, des changements, etc.
Elles sont contrôlées uniquement depuis le backend.

