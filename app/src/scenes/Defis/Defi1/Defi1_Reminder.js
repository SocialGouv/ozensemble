import React from 'react';
import Reminder from '../../../components/Reminder';
import { reminderDefis, reminderDefisMode, reminderDefisWeekDay } from '../../../recoil/reminder';
import { logEvent } from '../../../services/logEventsWithMatomo';
import { storage } from '../../../services/storage';

const Defi1_Reminder = (props) => {
  const isWithinDefi1 =
    storage.getString('@Defi1_StartedAt')?.length && storage.getString('@Defi1_ValidatedDays') !== 6;

  return (
    <Reminder
      {...props}
      reminderState={reminderDefis}
      reminderModeState={reminderDefisMode}
      reminderWeekDayState={reminderDefisWeekDay}
      name="DEFI1_REMINDER"
      title={isWithinDefi1 ? 'Un rappel pour penser à faire votre défi 7 jours' : undefined}
      notifReminderTitle={isWithinDefi1 ? "C'est l'heure de votre défi 7 jours !" : undefined}
      notifReminderMessage={isWithinDefi1 ? '' : undefined}
      onlyDaily
      onSetReminderConfirm={(reminder, mode) => {
        logEvent({
          category: 'REMINDER',
          action: 'REMINDER_SET_MODE',
          name: mode,
        });
        logEvent({
          category: 'REMINDER',
          action: 'REMINDER_SET',
          name: 'timestamp',
          value: reminder,
        });
      }}
    />
  );
};

export default Defi1_Reminder;
