import { currencyFormatter } from '@utils/formatter';

const makeIncome = (data: CalendarAccount) => {
  const incomeFormat = {
    calendarId: 'cal1',
    category: 'allday',
    start: `${data.day}`,
    end: `${data.day}`,
    isVisible: true,
    title: currencyFormatter(Number(`${data.incomeSum}`)),
  };

  return incomeFormat;
};

const makeExpenditure = (data: CalendarAccount) => {
  const expenditureFormat = {
    calendarId: 'cal1',
    category: 'milestone',
    start: `${data.day}`,
    end: `${data.day}`,
    isVisible: true,
    title: currencyFormatter(Number(`${data.incomeSum}`)),
  };

  return expenditureFormat;
};

const makeTotal = (data: CalendarAccount) => {
  const totalFormat = {
    calendarId: 'cal1',
    category: 'task',
    start: `${data.day}`,
    end: `${data.day}`,
    isVisible: true,
    title: currencyFormatter(Number(`${data.incomeSum}`)),
  };

  return totalFormat;
};

export const makeCalendarData = (calendarData: CalendarAccount[]) => {
  const IncomeData = calendarData.map((x) => makeIncome(x));
  const ExpenditureData = calendarData.map((x) => makeExpenditure(x));
  const TotalData = calendarData.map((x) => makeTotal(x));

  return IncomeData.concat(ExpenditureData).concat(TotalData);
};
