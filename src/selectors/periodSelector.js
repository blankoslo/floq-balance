import { createSelector } from 'reselect';
import moment from 'moment';

const getPeriod = (_year, _month) => {
  let year;
  let month;
  if (isNaN(_year) || isNaN(_month)) {
    year = 2016;
    month = 1;
  }
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
