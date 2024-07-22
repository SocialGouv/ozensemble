import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';

dayjs.locale('fr');
dayjs.extend(relativeTime);
dayjs.extend(isBetween);

export function isToday(date) {
  return dayjs(date).isSame(dayjs(), 'day');
}

export const dayjsInstance = dayjs;
