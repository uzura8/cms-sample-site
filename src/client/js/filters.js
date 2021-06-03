import str from '@/util/str'
import moment from '@/moment'

export function numFormat(num) {
  num = parseInt(num)
  if (isNaN(num)) return 0
  return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

export function substr(text, num) {
  return str.substr(text, num, '...')
}

export function dateFormat(date, format='LLL') {
  return moment(date).format(format);
}

