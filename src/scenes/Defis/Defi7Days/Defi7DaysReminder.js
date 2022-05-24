import React from 'react';
import Reminder from '../../../components/Reminder';
import { reminderDefis, reminderDefisMode, reminderDefisWeekDay } from '../../../recoil/reminder';
import { storage } from '../../../services/storage';

const Defi7DaysReminder = (props) => {
  const isWithinDefi7Days =
    storage.getString('DEFI_7_JOURS_STARTED_AT')?.length && storage.getString('DEFI_7_JOURS_VALIDATED_DAYS') !== '6';
  // const reminderCaption = isWithinDefi7Days ? 'Rappel de mon défi 7 jours' : 'Rappel de mon suivi de consommations';

  return (
    <Reminder
      {...props}
      reminderState={reminderDefis}
      reminderModeState={reminderDefisMode}
      reminderWeekDayState={reminderDefisWeekDay}
      name="DEFI_7_DAYS_REMINDER"
      title={'Un rappel pour penser à faire votre défi 7 jours'}
      notifReminderTitle={"C'est l'heure de votre défi 7 jours !"}
      notifReminderMessage={''}
      onlyDaily
      onSetReminderConfirm={(reminder, mode, weekDay) => {
        // matomo
      }}
    />
  );
};

export default Defi7DaysReminder;
