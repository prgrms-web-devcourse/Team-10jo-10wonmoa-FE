import { currencyFormatter } from '@utils/formatter';

const makeEachData = (data: CalendarAccount) => {
  const format = {
    income: {
      calendarId: 'cal1',
      category: 'allday',
      start: `${data.date}`,
      end: `${data.date}`,
      isVisible: true,
      title: `${
        data.incomeSum === 0 ? '' : currencyFormatter(Number(data.incomeSum))
      }`,
    },
    expenditure: {
      calendarId: 'cal1',
      category: 'milestone',
      start: `${data.date}`,
      end: `${data.date}`,
      isVisible: true,
      title: `${
        data.expenditureSum === 0
          ? ''
          : currencyFormatter(Number(data.expenditureSum))
      }`,
    },
    total: {
      calendarId: 'cal1',
      category: 'task',
      start: `${data.date}`,
      end: `${data.date}`,
      isVisible: true,
      title: `${
        data.totalSum === 0 ? '' : currencyFormatter(Number(data.totalSum))
      }`,
    },
  };

  return format;
};

export const makeCalendarData = (calendarData: CalendarAccount[]) => {
  const IncomeData = calendarData.map((x) => makeEachData(x).income);
  const ExpenditureData = calendarData.map((x) => makeEachData(x).expenditure);
  const TotalData = calendarData.map((x) => makeEachData(x).total);

  return IncomeData.concat(ExpenditureData).concat(TotalData);
};
