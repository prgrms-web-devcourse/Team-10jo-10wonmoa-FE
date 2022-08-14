import dayjs from 'dayjs';
import 'dayjs/locale/ko';

type FormatKey =
  | 'YEAR'
  | 'YEAR_MONTH'
  | 'DAY'
  | 'WEEKDAY'
  | 'YEAR_DAY_DASH'
  | 'YEAR_MONTH_DAY_DASH'
  | 'HOUR_MINUTE';

const DATE_FORMAT_TYPE = {
  YEAR: 'YYYY',
  YEAR_MONTH: 'YYYY.MM',
  DAY: 'DD',
  WEEKDAY: 'ddd',
  YEAR_DAY_DASH: 'YYYY-MM',
  YEAR_MONTH_DAY_DASH: 'YYYY-MM-DD',
  HOUR_MINUTE: 'HH:mm',
} as const;

export const dateFormatter = (d: Date | string, format: FormatKey) => {
  const date = dayjs(d);
  return date.locale('ko').format(DATE_FORMAT_TYPE[format]);
};
