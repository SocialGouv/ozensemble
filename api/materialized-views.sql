
create materialized view matomo_actives as with activés as (
    select min("public"."matomo"."action_timestamp"::date) as "timestamp", "public"."matomo"."userid" as "userid", "dimension1", case
    when "action_eventaction" = 'CONSO_ADD' or "action_eventaction" = 'CONSO_DRINKLESS' or "action_eventaction" = 'CONSO_DRINK' then 'CONSO'
    when "action_eventaction" = 'CONTACT_RDV' then 'APPEL'
    when "action_eventaction" = 'GOAL_DRINKWEEK' then 'OBJECTIF'
    when "action_eventaction" = 'GOAL_ESTIMATION_DRINK' then 'GAINS'
    when "action_eventaction" like '%DEFI%' then 'DEFI'
    when "action_eventaction" = 'HEALTH' then 'SANTE' end as "Action"
    FROM "public"."matomo"
    WHERE ("public"."matomo"."action_eventaction" = 'CONTACT_RDV') or ((("public"."matomo"."action_eventcategory" = 'DEFI'
    OR "public"."matomo"."action_eventcategory" = 'DEFI_7_DAYS' or "public"."matomo"."action_eventcategory" = 'DEFI1')
   AND ("public"."matomo"."action_eventaction" = 'DEFI_7_DAYS_VALIDATE_DAY' or "public"."matomo"."action_eventaction" = 'DEFI1_VALIDATE_DAY') AND "public"."matomo"."action_eventvalue" = 1))
   or ("public"."matomo"."action_eventaction" = 'CONSO_DRINK' or "public"."matomo"."action_eventaction" = 'CONSO_DRINKLESS' or "public"."matomo"."action_eventaction" = 'CONSO_ADD') 
   or (("public"."matomo"."action_eventcategory" = 'GOAL' or "public"."matomo"."action_eventcategory" = 'GAINS')
   AND "public"."matomo"."action_eventaction" = 'GOAL_DRINKWEEK') 
   or ("public"."matomo"."action_eventaction" = 'GOAL_ESTIMATION_DRINK')
   or ("public"."matomo"."action_eventcategory" = 'NAVIGATION'
   AND "public"."matomo"."action_eventaction" = 'HEALTH') group by "userid", "dimension1", "Action"
) select "userid", date_trunc('day', "timestamp") as "timestamp", "dimension1", "Action" from "activés"


create materialized view matomo_petit_engages as with ranked_defi as (
    select "public"."matomo"."action_timestamp"::date as "timestamp", "public"."matomo"."userid" as "userid", "public"."matomo"."dimension1" as "dimension1", 'DEFI' as "action", ROW_NUMBER() OVER (PARTITION BY "public"."matomo"."userid" ORDER BY "public"."matomo"."action_timestamp") as rn
    FROM "public"."matomo"
    WHERE ((("public"."matomo"."action_eventcategory" = 'DEFI'
    OR "public"."matomo"."action_eventcategory" = 'DEFI_7_DAYS' or "public"."matomo"."action_eventcategory" = 'DEFI1')
   AND ("public"."matomo"."action_eventaction" = 'DEFI_7_DAYS_VALIDATE_DAY' or "public"."matomo"."action_eventaction" = 'DEFI1_VALIDATE_DAY') AND "public"."matomo"."action_eventvalue" = 3))
), defi as (
	select "timestamp", "action", "userid", "dimension1" from ranked_defi where rn = 1
), saisies_conso as (
    select "public"."matomo"."userid" as "userid", date_trunc('day', "public"."matomo"."action_timestamp") as "time", "dimension1",
    row_number() over (partition by "public"."matomo"."userid" order by "public"."matomo"."action_timestamp") AS "rn"
    from "public"."matomo"
    WHERE ("public"."matomo"."action_eventaction" = 'CONSO_DRINK' or "public"."matomo"."action_eventaction" = 'CONSO_DRINKLESS' or "public"."matomo"."action_eventaction" = 'CONSO_ADD') 
    group by "action_timestamp", "public"."matomo"."userid", "dimension1" order by "public"."matomo"."userid", date_trunc('day', "public"."matomo"."action_timestamp")
), dates_conso as (
    select "userid", "time", "dimension1", date_trunc('day', "time") - date_trunc('day', lag("time", 1) over (partition by "userid" order by "time")) as "difference_last_saisie", "saisies_conso"."rn"
    from "saisies_conso" group by "userid", "saisies_conso"."rn", "saisies_conso"."time", "dimension1" order by "userid", "saisies_conso"."rn", "saisies_conso"."time"
), different_days_conso as (
    select * from "dates_conso"
    where "difference_last_saisie" >= '1 day'
), total_conso as (
    select "userid", "time" as "timestamp", "dimension1",
    row_number() over (partition by "userid") as "number"
    from "different_days_conso" 
), conso as (
    select *, 'CONSO' as "action" from "total_conso"
    where "total_conso"."number"=3
), saisies_objectif as (
    select "public"."matomo"."userid" as "userid", "dimension1", date_trunc('day', "public"."matomo"."action_timestamp") as "time",
    row_number() over (partition by "public"."matomo"."userid" order by "public"."matomo"."action_timestamp") AS "rn"
    from "public"."matomo"
    where (("public"."matomo"."action_eventcategory" = 'GOAL' or "public"."matomo"."action_eventcategory" = 'GAINS')
   AND "public"."matomo"."action_eventaction" = 'GOAL_DRINKWEEK') 
    group by "action_timestamp", "public"."matomo"."userid", "dimension1" order by "public"."matomo"."userid", date_trunc('day', "public"."matomo"."action_timestamp")
), dates_objectif as (
    select "userid", "time", "dimension1", date_trunc('day', "time") - date_trunc('day', lag("time", 1) over (partition by "userid" order by "time")) as "difference_last_saisie", "saisies_objectif"."rn"
    from "saisies_objectif" group by "userid", "saisies_objectif"."rn", "saisies_objectif"."time", "dimension1" order by "userid", "saisies_objectif"."rn", "saisies_objectif"."time"
), different_days_objectif as (
    select * from "dates_objectif"
    where "difference_last_saisie" >= '3 day'
), total_objectif as (
    select "userid", "time" as "timestamp", "dimension1",
    row_number() over (partition by "userid") as "number"
    from "different_days_objectif" 
), objectif as (
    select *, 'OBJECTIF' as "action" from "total_objectif"
    where "total_objectif"."number"=1
), estimation as (
    select min("public"."matomo"."action_timestamp"::date) as "timestamp", "public"."matomo"."userid" as "userid"
    FROM "public"."matomo"
    WHERE "public"."matomo"."action_eventaction" = 'GOAL_ESTIMATION_DRINK' group by "public"."matomo"."userid"
), saisies_gain as (
    select "public"."matomo"."userid" as "userid", date_trunc('day', "public"."matomo"."action_timestamp") as "time", "dimension1",
    row_number() over (partition by "public"."matomo"."userid" order by "public"."matomo"."action_timestamp") AS "rn"
    from "public"."matomo"
    WHERE ("public"."matomo"."action_eventcategory" = 'NAVIGATION'
   AND "public"."matomo"."action_eventaction" = 'GAINS_MAIN_VIEW')
    group by "action_timestamp", "public"."matomo"."userid", "dimension1" order by "public"."matomo"."userid", date_trunc('day', "public"."matomo"."action_timestamp")
), joined_gain as (
    select "saisies_gain"."userid", "time", "rn", "dimension1" from "saisies_gain" inner join "estimation" on "saisies_gain"."userid" = "estimation"."userid"
), dates_gain as (
    select "userid", "time", "dimension1", date_trunc('day', "time") - date_trunc('day', lag("time", 1) over (partition by "userid" order by "time")) as "difference_last_saisie", "joined_gain"."rn"
    from "joined_gain" group by "userid", "joined_gain"."rn", "joined_gain"."time", "dimension1" order by "userid", "joined_gain"."rn", "joined_gain"."time"
), different_days_gain as (
    select * from "dates_gain"
    where "difference_last_saisie" >= '1 day'
), total_gain as (
    select "userid",
    row_number() over (partition by "userid") as "number", "time" as "timestamp", "dimension1"
    from "different_days_gain" 
), gain as (
    select *, 'GAIN' as "action" from "total_gain" 
    where "total_gain"."number" = 3
), saisies_santé as (
    select "public"."matomo"."userid" as "userid", date_trunc('day', "public"."matomo"."action_timestamp") as "time","dimension1",
    row_number() over (partition by "public"."matomo"."userid" order by "public"."matomo"."action_timestamp") AS "rn"
    from "public"."matomo"
    where "public"."matomo"."action_eventaction" = 'HEALTH_ARTICLE'
    group by "action_timestamp", "public"."matomo"."userid", "dimension1" order by "public"."matomo"."userid", date_trunc('day', "public"."matomo"."action_timestamp")
), santé as (
    select "userid", date_trunc('day', "time") as "timestamp", 'SANTE' as "action", "dimension1"
    from "saisies_santé" where "rn"=2
), petits_engagés_full as (
  SELECT 'conso' AS source, "timestamp", "userid", "dimension1", "action" FROM "conso" UNION ALL
  SELECT 'defi' AS source, "timestamp", "userid", "dimension1", "action" FROM "defi" UNION ALL
  SELECT 'objectif' AS source, "timestamp", "userid", "dimension1", "action" FROM "objectif" UNION ALL
  SELECT 'gain' AS source, "timestamp", "userid", "dimension1", "action" FROM "gain" UNION ALL
  SELECT 'santé' AS source, "timestamp", "userid", "dimension1", "action" FROM "santé"
), petits_engagés_ranked AS (
  select "userid", DATE_TRUNC('day', "timestamp") AS "action_timestamp", "dimension1", "action", ROW_NUMBER() OVER (PARTITION BY "userid" ORDER BY "timestamp") as rn
  FROM petits_engagés_full
), petits_engagés as (
   select "userid", "action_timestamp", "dimension1", "action" FROM petits_engagés_ranked WHERE rn = 1
) select * from petits_engagés;



create materialized view matomo_ouvertures as with ouvertures as (
    select min("public"."matomo"."action_timestamp"::date) as "timestamp", "public"."matomo"."userid" as "userid", "dimension1" as "Version"
    FROM "public"."matomo"
    WHERE ("public"."matomo"."action_eventaction" = 'APP_OPEN') group by "userid", "dimension1"
) select "userid", date_trunc('day', "timestamp") as "timestamp", "Version" as "dimension1" from "ouvertures"



create materialized view matomo_engages as with ranked_defi as (
    select "public"."matomo"."action_timestamp"::date as "timestamp", "public"."matomo"."userid" as "userid", "public"."matomo"."dimension1" as "dimension1", 'DEFI' as "action", ROW_NUMBER() OVER (PARTITION BY "public"."matomo"."userid" ORDER BY "public"."matomo"."action_timestamp") as rn
    FROM "public"."matomo"
    WHERE ((("public"."matomo"."action_eventcategory" = 'DEFI'
    OR "public"."matomo"."action_eventcategory" = 'DEFI_7_DAYS' or "public"."matomo"."action_eventcategory" = 'DEFI1')
   AND ("public"."matomo"."action_eventaction" = 'DEFI_7_DAYS_VALIDATE_DAY' or "public"."matomo"."action_eventaction" = 'DEFI1_VALIDATE_DAY') AND "public"."matomo"."action_eventvalue" = 6))
), defi as (
	select "timestamp", "action", "userid", "dimension1" from ranked_defi where rn = 1
), saisies_conso as (
    select "public"."matomo"."userid" as "userid", date_trunc('day', "public"."matomo"."action_timestamp") as "time", "dimension1",
    row_number() over (partition by "public"."matomo"."userid" order by "public"."matomo"."action_timestamp") AS "rn"
    from "public"."matomo"
    WHERE ("public"."matomo"."action_eventaction" = 'CONSO_DRINK' or "public"."matomo"."action_eventaction" = 'CONSO_DRINKLESS' or "public"."matomo"."action_eventaction" = 'CONSO_ADD') 
    group by "action_timestamp", "public"."matomo"."userid", "dimension1" order by "public"."matomo"."userid", date_trunc('day', "public"."matomo"."action_timestamp")
), dates_conso as (
    select "userid", "time", date_trunc('day', "time") - date_trunc('day', lag("time", 1) over (partition by "userid" order by "time")) as "difference_last_saisie", "saisies_conso"."rn", "dimension1"
    from "saisies_conso" group by "userid", "saisies_conso"."rn", "saisies_conso"."time", "dimension1" order by "userid", "saisies_conso"."rn", "saisies_conso"."time"
), different_days_conso as (
    select * from "dates_conso"
    where "difference_last_saisie" >= '1 day'
), total_conso as (
    select "userid", "time" as "timestamp", "dimension1",
    row_number() over (partition by "userid") as "number"
    from "different_days_conso" 
), conso as (
    select *, 'CONSO' as "action" from "total_conso"
    where "total_conso"."number"=7
), saisies_objectif as (
    select "public"."matomo"."userid" as "userid", date_trunc('day', "public"."matomo"."action_timestamp") as "time", "dimension1",
    row_number() over (partition by "public"."matomo"."userid" order by "public"."matomo"."action_timestamp") AS "rn"
    from "public"."matomo"
    where (("public"."matomo"."action_eventcategory" = 'GOAL' or "public"."matomo"."action_eventcategory" = 'GAINS')
   AND "public"."matomo"."action_eventaction" = 'GOAL_DRINKWEEK') 
    group by "action_timestamp", "public"."matomo"."userid", "dimension1" order by "public"."matomo"."userid", date_trunc('day', "public"."matomo"."action_timestamp")
), dates_objectif as (
    select "userid", "time", date_trunc('day', "time") - date_trunc('day', lag("time", 1) over (partition by "userid" order by "time")) as "difference_last_saisie", "saisies_objectif"."rn", "dimension1"
    from "saisies_objectif" group by "userid", "saisies_objectif"."rn", "saisies_objectif"."time", "dimension1" order by "userid", "saisies_objectif"."rn", "saisies_objectif"."time"
), different_days_objectif as (
    select * from "dates_objectif"
    where "difference_last_saisie" >= '7 day'
), total_objectif as (
    select "userid", "time" as "timestamp", "dimension1",
    row_number() over (partition by "userid") as "number"
    from "different_days_objectif" 
), objectif as (
    select *, 'OBJECTIF' as "action" from "total_objectif"
    where "total_objectif"."number"=1
), estimation as (
    select min("public"."matomo"."action_timestamp"::date) as "timestamp", "public"."matomo"."userid" as "userid"
    FROM "public"."matomo"
    WHERE "public"."matomo"."action_eventaction" = 'GOAL_ESTIMATION_DRINK' group by "public"."matomo"."userid"
), saisies_gain as (
    select "public"."matomo"."userid" as "userid", date_trunc('day', "public"."matomo"."action_timestamp") as "time", "dimension1",
    row_number() over (partition by "public"."matomo"."userid" order by "public"."matomo"."action_timestamp") AS "rn"
    from "public"."matomo"
    WHERE ("public"."matomo"."action_eventcategory" = 'NAVIGATION'
   AND "public"."matomo"."action_eventaction" = 'GAINS_MAIN_VIEW')
    group by "action_timestamp", "public"."matomo"."userid", "dimension1" order by "public"."matomo"."userid", date_trunc('day', "public"."matomo"."action_timestamp")
), joined_gain as (
    select "saisies_gain"."userid", "time", "rn", "dimension1" from "saisies_gain" inner join "estimation" on "saisies_gain"."userid" = "estimation"."userid"
), dates_gain as (
    select "userid", "time", date_trunc('day', "time") - date_trunc('day', lag("time", 1) over (partition by "userid" order by "time")) as "difference_last_saisie", "joined_gain"."rn", "dimension1"
    from "joined_gain" group by "userid", "joined_gain"."rn", "joined_gain"."time", "dimension1" order by "userid", "joined_gain"."rn", "joined_gain"."time"
), different_days_gain as (
    select * from "dates_gain"
    where "difference_last_saisie" >= '1 day'
), total_gain as (
    select "userid", "dimension1",
    row_number() over (partition by "userid") as "number", "time" as "timestamp"
    from "different_days_gain" 
), gain as (
    select *, 'GAIN' as "action" from "total_gain" 
    where "total_gain"."number" = 7
), saisies_santé as (
    select "public"."matomo"."userid" as "userid", date_trunc('day', "public"."matomo"."action_timestamp") as "time", "dimension1",
    row_number() over (partition by "public"."matomo"."userid" order by "public"."matomo"."action_timestamp") AS "rn"
    from "public"."matomo"
    where "public"."matomo"."action_eventaction" = 'HEALTH_SCROLL_ARTICLE_TO_BOTTOM'
    group by "action_timestamp", "public"."matomo"."userid", "dimension1" order by "public"."matomo"."userid", date_trunc('day', "public"."matomo"."action_timestamp")
), santé as (
    select "userid", date_trunc('month', "time") as "timestamp", 'SANTE' as "action", "dimension1"
    from "saisies_santé" where "rn"=2
), engagés_full as (
  SELECT 'conso' AS source, "timestamp", "userid", "dimension1", "action" FROM "conso" UNION ALL
  SELECT 'defi' AS source, "timestamp", "userid", "dimension1", "action" FROM "defi" UNION ALL
  SELECT 'objectif' AS source, "timestamp", "userid", "dimension1", "action" FROM "objectif" UNION ALL
  SELECT 'gain' AS source, "timestamp", "userid", "dimension1", "action" FROM "gain" UNION ALL
  SELECT 'santé' AS source, "timestamp", "userid", "dimension1", "action" FROM "santé"
), engagés_ranked AS (
  select "userid", DATE_TRUNC('day', "timestamp") AS "action_timestamp", "dimension1", "action", ROW_NUMBER() OVER (PARTITION BY "userid" ORDER BY "timestamp") as rn
  FROM engagés_full
), engagés as (
   select "userid", "action_timestamp", "dimension1", "action" FROM engagés_ranked WHERE rn = 1
) select * from engagés
