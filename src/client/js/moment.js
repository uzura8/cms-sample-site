import moment from 'moment';
import 'moment/locale/ja'
import 'moment/locale/th'
import i18n from '@/i18n'

moment.locale(i18n.locale);

export default moment
