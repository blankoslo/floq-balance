import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import moment from 'moment';
import weeksSelector from '../selectors/weeksSelector';

const getProjectDays = (projectId, balance, weeks, employeeId) =>
  weeks.map(w => {
    let sumWeek = 0;
    // need to pick a date which week is always in the specified year :)
    // startOf week overrides locale-settings. E.g. if locale is 'en' (american),the week
    // starts on Sunday, and then isoWeek skips a day. https://en.wikipedia.org/wiki/Week
    const firstDate = moment().startOf('isoweek').utc([w.year, 2, 1])
      .isoWeek(w.week);

    // moment().add(..) mutates
    for (let i = 0; i < 7; (i++, firstDate.add(1, 'days'))) {
      if (balance.data
        .contains(`${employeeId}${projectId}${firstDate.format('YYYY-MM-DD')}`)) {
        sumWeek++;
      }
    }
    return sumWeek;
  });

const showProjects = (weeks, employeeId, balance, projects) =>
  projects.data.toList().map(p => {
    const days = getProjectDays(p.id, balance, weeks, employeeId);
    return Object.assign({}, p, { days });
  });

const getTableData = (weeks, selectedEmployee, balance, projects) => {
  if (projects.loading || balance.loading || selectedEmployee === null) {
    return { loading: true, data: new Immutable.Map() };
  }
  const projectsWithWeeks = showProjects(weeks, selectedEmployee, balance, projects);
  const result = {
    loading: false,
    data: {
      weeks: weeks.map((w, index) =>
        Object.assign({}, w, {
          total: projectsWithWeeks
            .map(p => p.days.get(index))
            .reduce((pre, cur) => parseInt(pre) + parseInt(cur), 0)
        })),
      projects: projectsWithWeeks,
    }
  };
  return result;
};

export default createSelector(
  weeksSelector,
  state => state.selected_employee,
  state => state.balance,
  state => state.projects,
  getTableData
);
