import moment from 'moment';

const calculateNewYearWeek = (year, week, change) => {
  const newDate = moment().year(year).isoWeek(week)
    .add(change, 'weeks');

  return { year: newDate.year(), week: newDate.isoWeek() };
};

export default calculateNewYearWeek;
