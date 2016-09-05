import { createSelector } from 'reselect';
import moment from 'moment';

const getPeriod = (_year, _month) => {
  const year = isNaN(_year) ? 2016 : _year;
  const month = isNaN(_month) ? 1 : _month;

  const startDate = moment().year(year).month(month - 1).date(1)
    .format('YYYY-MM-DD');
  const endDate = moment().year(year).month(month).date(0)
    .format('YYYY-MM-DD');

  return {
    startDate,
    endDate
  };
};

export default createSelector(
  (_, props) => parseInt(props.location.query.year),
  (_, props) => parseInt(props.location.query.month),
  getPeriod
);
