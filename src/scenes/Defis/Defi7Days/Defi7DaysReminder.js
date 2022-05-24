import React from 'react';
import Reminder from '../../../components/Reminder';
import { reminderDefis, reminderDefisMode, reminderDefisWeekDay } from '../../../recoil/reminder';
import { storage } from '../../../services/storage';

const Defi7DaysReminder = (props) => {
  const isWithinDefi7Days =
    storage.getString('DEFI_7_JOURS_STARTED_AT')?.length && storage.getString('DEFI_7_JOURS_VALIDATED_DAYS') !== '6';

  return (
    <Reminder
      {...props}
      reminderState={reminderDefis}
      reminderModeState={reminderDefisMode}
      reminderWeekDayState={reminderDefisWeekDay}
      name="DEFI_7_DAYS_REMINDER"
      title={isWithinDefi7Days ? 'Un rappel pour penser à faire votre défi 7 jours' : undefined}
      notifReminderTitle={isWithinDefi7Days ? "C'est l'heure de votre défi 7 jours !" : undefined}
      notifReminderMessage={isWithinDefi7Days ? '' : undefined}
      onlyDaily
      onSetReminderConfirm={(reminder, mode, weekDay) => {
        // matomo
      }}
    />
  );
};

export default Defi7DaysReminder;
