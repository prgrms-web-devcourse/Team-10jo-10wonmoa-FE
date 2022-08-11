const makeIncome = (data: number, idx: number) => {
  const incomeFormat = {
    calendarId: 'cal1',
    category: 'allday',
    start: `2022-08-${idx}`,
    end: `2022-08-${idx}`,
    isVisible: true,
  };

  const eachObject = { title: 0 };
  eachObject.title = data;
  const eachData = Object.assign(incomeFormat, eachObject);

  return eachData;
};

const makeExpenditure = (data: number, idx: number) => {
  const expenditureFormat = {
    calendarId: 'cal1',
    category: 'milestone',
    start: `2022-08-${idx}`,
    end: `2022-08-${idx}`,
    isVisible: true,
  };

  const eachObject = { title: 0 };
  eachObject.title = data;

  const eachData = Object.assign(expenditureFormat, eachObject);

  return eachData;
};

const makeTotal = (data: number, idx: number) => {
  const totalFormat = {
    calendarId: 'cal1',
    category: 'task',
    start: `2022-08-${idx}`,
    end: `2022-08-${idx}`,
    isVisible: true,
  };

  const eachObject = { title: 0 };
  eachObject.title = data;

  const eachData = Object.assign(totalFormat, eachObject);

  return eachData;
};

export const makeCalendarData = (calendarData: CalendarAccount[]) => {
  const IncomeData = calendarData.map((x: CalendarAccount, idx) =>
    makeIncome(x.incomeSum, idx + 1)
  );
  const ExpenditureData = calendarData.map((x, idx) =>
    makeExpenditure(x.expenditureSum, idx + 1)
  );
  const TotalData = calendarData.map((x, idx) =>
    makeTotal(x.totalSum, idx + 1)
  );

  return IncomeData.concat(ExpenditureData).concat(TotalData);
};
