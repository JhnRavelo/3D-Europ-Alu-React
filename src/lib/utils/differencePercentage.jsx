const differencePercentage = (nbUser) => {
  const date = new Date();
  const Lastmonth = date.getMonth() - 1;
  const Thismonth = Lastmonth + 1;
  const findThisMonth = nbUser.countByMonthByYear.find(
    (nb) => nb.month === Thismonth
  );
  const findLastMonth = nbUser.countByMonthByYear.find(
    (nb) => nb.month === Lastmonth
  );
  if (!findLastMonth || !findThisMonth) {
    return 0;
  }
  const percentageUser = Math.floor(
    ((findThisMonth?.count - findLastMonth?.count) / findLastMonth?.count) * 100
  );
  return percentageUser;
};

export default differencePercentage;
