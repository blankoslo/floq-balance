import { createSelector } from 'reselect';
import weeksSelector from '../selectors/weeksSelector';
import employeesSelector from '../selectors/employeesSelector';

const getWeeksTotal = (weeks, employees) => {
  if (employees.loading) {
    return { loading: true, data: null };
  }
  return weeks.map((week, index) =>
    Object.assign({}, week, {
      sum: employees.data.toIndexedSeq().reduce((result, item) =>
        result + item.weeks.get(index).days, 0),
      staffable: employees.data
        .toIndexedSeq()
        .reduce((result, item) => result + item.weeks.get(index).staffable, 0)
    })
  );
};


export default createSelector(
  weeksSelector,
  employeesSelector,
  getWeeksTotal
);
