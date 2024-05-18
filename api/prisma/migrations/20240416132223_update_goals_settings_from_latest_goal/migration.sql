-- Update all users with their latest goal settings
WITH LatestGoals AS (
  SELECT
    "userId",
    MAX(date) as MaxDate
  FROM
    "Goal"
  GROUP BY
    "userId"
),
GoalSettings AS (
  SELECT
    g."userId",
    g."daysWithGoalNoDrink" as "goal_daysWithGoalNoDrink",
    g."dosesByDrinkingDay" as "goal_dosesByDrinkingDay",
    g."dosesPerWeek" as "goal_dosesPerWeek"
  FROM
    "Goal" g
    INNER JOIN LatestGoals lg ON g."userId" = lg."userId"
    AND g.date = lg.MaxDate
)
UPDATE
  "User" u
SET
  "goal_daysWithGoalNoDrink" = gs."goal_daysWithGoalNoDrink",
  "goal_dosesByDrinkingDay" = gs."goal_dosesByDrinkingDay",
  "goal_dosesPerWeek" = gs."goal_dosesPerWeek",
  "goal_isSetup" = TRUE -- Assume you want to set this flag when updating goal data
FROM
  GoalSettings gs
WHERE
  u.id = gs."userId";