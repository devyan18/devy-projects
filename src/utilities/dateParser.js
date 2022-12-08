import 'dayjs/locale/es';
import dayjs from 'dayjs';

export function dateParser (date) {
  return dayjs(date).locale('en').format('DD MMM hh:mm A');
}

export function getHours (date) {
  return parseInt(dayjs(date).locale('es').format('h'));
}

export function getMins (date) {
  return parseInt(dayjs(date).locale('es').format('m'));
}
