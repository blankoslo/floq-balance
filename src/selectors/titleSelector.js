import { createSelector } from 'reselect';
import moment from 'moment';

export const navigation = (year, month, pathname) => {
  const nextMonth = moment().year(year).month(month + 1);
  const prevMonth = moment().year(year).month(month - 1);
  return {
    next: `${pathname}?year=${nextMonth.format('YYYY')}&month=${nextMonth.format('M')}`,
    previous: `${pathname}?year=${prevMonth.format('YYYY')}&month=${prevMonth.format('M')}`
  };
};

export const getPeriod = (_year, _month, pathname) => {
  const year = isNaN(_year) ? parseInt(moment().format('YYYY')) : _year;
  // moment.js 0 indexes months, while input from url is 1 indexed
  // If _month is unspecified we want the previous month.
  // If current month is january, we want december last year.
  const month = isNaN(_month) ? moment().month() - 1 : _month - 1;

  const date = moment().year(year).month(month);

  return {
    startDate: date.clone().startOf('month').format('YYYY-MM-DD'),
    endDate: date.clone().endOf('month').format('YYYY-MM-DD'),
    year: date.format('YYYY'),
    month: date.format('MMMM'),
    navigation: navigation(date.format('YYYY'), month, pathname),
  };
};

export default createSelector(
  (_, props) => parseInt(props.location.query.year),
  (_, props) => parseInt(props.location.query.month),
  (_, props) => props.location.pathname,
  getPeriod,
);
