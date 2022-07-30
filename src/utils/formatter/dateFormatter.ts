import dayjs from 'dayjs';

type FormatKey = 'YEAR' | 'YEAR_MONTH';

const DATE_FORMAT_TYPE: Record<FormatKey, string> = {
  YEAR: 'YYYY',
  YEAR_MONTH: 'YYYY.MM',
} as const;

export const dateFormatter = (d: Date | string, format: FormatKey) => {
  const date = dayjs(d);
  return date.format(DATE_FORMAT_TYPE[format]);
};
