import dayjs from 'dayjs';

export const fakeDefi1 = {
  '@QuizzMotivations_result': 'true',
  '@QuizzLifeQuality_answers':
    '{"0":"low","1":"a-lot","2":"a-lot","3":"a-lot","4":"not-at-all","5":"a-lot","6":"a-lot","7":"a-lot"}',
  '@QuizzEvaluateConso_answers':
    '{"0":"once-a-month","1":"five","2":"once-a-week","3":"once-a-week","4":"once-a-week","5":"once-a-week","6":"once-a-week","7":"once-a-week","8":"yes-last-year","9":"yes-but-not-last-year","age":"-18","gender":"man"}',
  '@QuizzLifeQuality_result':
    '[{"title":"Santé ressentie","score":-1},{"title":"Activité physique","score":-1},{"title":"Handicap physique","score":-1},{"title":"Douleurs physiques","score":-1},{"title":"Vitalité","score":-1},{"title":"Relationnel","score":-1},{"title":"Santé psychique","score":-1},{"title":"Frein psychique","score":-1}]',
  '@Defi1_LastUpdate': dayjs().format('YYYY-MM-DD'),
  '@Defi1_ValidatedDays': 7,
  // '@DefisReminder-setup': {
  //   bool: true,
  // },
  // '@DefisReminder': {
  //   string: '"2022-12-12T19:00:06.080Z"',
  // },
  '@QuizzMotivations_answers': '["2.3","2.2","3.2","3.3","4.3"]',
  '@Age': 2,
  '@Defi1_StartedAt': dayjs().format('YYYY-MM-DD'),
  '@QuizzEvaluateConso_result': '{"scoreAddiction":"addicted","scoreArrow":"RESULT_ARROW_ADDICTED"}',
};

export const fakeDefi2 = {
  '@Defi2_LastUpdate': dayjs().format('YYYY-MM-DD'),
  '@Defi2_ValidatedDays': 7,
  '@Defi2_OnBoardingDoneState': true,
  '@Defi2_EmotionState': 5,
  '@QuizzRiskSituations_answers': '["1.2","1.3","2.6","2.5"]',
  '@QuizzRiskSituations_result': 'true',
};

export const fakeDefi3 = {
  '@QuizzDefi3Day5_answers': '{"0":"Faux","1":"Vrai","2":"Faux"}',
  '@Defi3_Day3_answers_Help': '["5.3","5.2","6.2","6.3","7.2","7.3"]',
  '@Defi3_Day3_result': 'true',
  '@Defi3_Day3_answers_Difficulties': '["1.3","2.1","2.3","3.1","4.1","4.3"]',
  '@Defi3_LastUpdate': '2022-12-12',
  '@QuizzDefi3Day1_answers': '{"0":"Vrai","1":"Faux","2":"Vrai","3":"Faux","4":"Vrai"}',
  '@Defi3_ValidatedDays': 7,
  '@Defi3_OnBoardingDoneState': true,
};

export const fakeDefi4 = {
  '@Defi4_OnBoardingDoneState': true,
  '@Defi4_Day5_Result': 'true',
  '@Defi4_Day5_Answers': '["1.9","1.8","1.7","1.6"]',
  '@Defi4_ValidatedDays': 7,
  '@Defi4_LastUpdate': '2022-12-12',
  // '@GainsReminder-setup': true,
  //  '@GainsReminder':  "\"2022-12-12T19:00:06.081Z\"",
  // '@StoredDetailedDrinksByDrinkingDay':
  // '[{"drinkKey":"hard-flasque","quantity":1,"id":"a9d5e1fc-039a-419f-b560-a68c1fc1b6f1"}]',
  // '@DaysWithGoalNoDrink': '["tuesday","wednesday"]',
  // '@GainPreviousDrinksPerWeek':
  // '[{"drinkKey":"beer-half","quantity":1,"id":"9a3c657f-3379-4177-b417-0f3830415653"},{"drinkKey":"cider-pint","quantity":1,"id":"eeec9cc7-ed34-441c-9137-e286b997fae2"}]',
};

export const fakeDefi5 = {
  '@Defi5_Day5_Result': 'true',
  '@Defi5_Day5_Answers': '"1.3"',
  '@Defi5_Day2_Answers': '["1.1","1.2","1.3"]',
  '@Defi5_ValidatedDays': 7,
  '@Defi5_LastUpdate': '2022-12-12',
  '@QuizzDefi5Day3partie1_answers': '{"0":"Oui","1":"Non"}',
  '@QuizzReevaluateConso_answers':
    '{"0":"once-a-month","1":"five","2":"once-a-week","3":"more-than-once-a-month","4":"once-a-week","5":"once-a-week","6":"once-a-week","7":"once-a-week","8":"yes-last-year","9":"yes-but-not-last-year","age":"18-25","gender":"woman"}',
  '@Defi5_Day4_Result': 'true',
  '@Defi5_Day2_Result': 'true',
  '@QuizzReevaluateConso_result': '{"scoreAddiction":"addicted","scoreArrow":"RESULT_ARROW_ADDICTED"}',
  '@Defi5_Day4_Answers': '["1.5","1.6","1.8"]',
  '@QuizzDefi5Day3partie2_answers':
    '{"0":"high","1":"slightly","2":"slightly","3":"slightly","4":"moderately","5":"slightly","6":"slightly","7":"slightly"}',
  '@QuizzDefi5Day3partie2_result':
    '[{"title":"Santé ressentie","score":1},{"title":"Activité physique","score":1},{"title":"Handicap physique","score":1},{"title":"Douleurs physiques","score":0.2},{"title":"Vitalité","score":0.2},{"title":"Relationnel","score":1},{"title":"Santé psychique","score":1},{"title":"Frein psychique","score":1}]',
};
