import { createSelector } from 'reselect';
import moment from 'moment';

const getPeriod = (_year, _month) => {
  const year = isNaN(_year) ? parseInt(moment().format('YYYY')) : _year;
  const month = isNaN(_month) ? moment().month() : _month - 1;

  const startDate = moment().year(year).month(month - 1).date(1)
    .format('YYYY-MM-DD');
  const endDate = moment().year(year).month(month).date(0)
    .format('YYYY-MM-DD');

  return {
    startDate,
    endDate,
    year,
    month: moment().month(month).format('MMMM'),
  };
};

export default createSelector(
  (_, props) => parseInt(props.location.query.year),
  (_, props) => parseInt(props.location.query.month),
  getPeriod
);
