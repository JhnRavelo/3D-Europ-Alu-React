const differencePercentage = (nbUser) => {
  const date = new Date();
  const Lastmonth = date.getMonth();
  const Thismonth = Lastmonth + 1;
  const findThisMonth = nbUser.countByMonthByYear.find(
    (nb) => nb.month === Thismonth
  );
  const findLastMonth = nbUser.countByMonthByYear.find(
    (nb) => nb.month === Lastmonth
  );
  const percentageUser = Math.floor(
    ((findThisMonth?.count - findLastMonth?.count) / findLastMonth?.count) * 100
  );
  if(!findLastMonth){
    return 0
  }
  return percentageUser;
};

export default differencePercentage;
