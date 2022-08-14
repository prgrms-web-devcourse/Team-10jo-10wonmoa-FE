export const makePieData = (consumption: StatisticIncome[]) => {
  const moreThanTenPercent = consumption.filter((x: StatisticIncome) =>
    x.percent >= 10 ? x : null
  );
  const leftPercent =
    100 -
    moreThanTenPercent
      .map((item) => item.percent)
      .reduce((prev, next) => prev + next, 0);
  const ETC =
    leftPercent !== 0 && leftPercent !== 100
      ? {
          name: '그외',
          total: 0,
          percent: Number(leftPercent.toFixed(1)),
        }
      : [];
  const pieData = moreThanTenPercent.concat(ETC);
  return pieData;
};
