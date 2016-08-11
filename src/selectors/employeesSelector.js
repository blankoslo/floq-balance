import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';

const getWeeks = (employeeId, workedDaysPerWeek, weeks, projectMap) => (
  weeks.map(w => {
    const { days, projects } = workedDaysPerWeek.data
      .get(employeeId, new Immutable.Map())
      .get(w.week, { days: 0, projects: new Immutable.List() });

    const unavailable = projects.reduce((result, item) =>
      result + (projectMap.data
      .get(item)
      .billable === 'unavailable' ? 1 : 0)
    , 0);
    // TODO: staffable is 5 minus count(official holy days)
    return {
      days,
      unavailable,
      staffable: 5
    };
  })
);

const getEmployees = (employees, workedDaysPerWeek, weeks, projectMap) => {
  if (employees.loading || workedDaysPerWeek.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: employees.data.map(e => ({
      name: `${e.first_name} ${e.last_name}`,
      id: e.id,
      weeks: getWeeks(e.id, workedDaysPerWeek, weeks, projectMap) }))
  };
};

export default createSelector(
  state => state.employees,
  state => state.worked_days_per_week,
  weeksSelector,
  state => state.projects,
  getEmployees,
);
