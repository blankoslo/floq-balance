import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

const getTableBody = (projects, hoursPerProject) => {
  if (projects.loading || hoursPerProject.loading) {
    return { loading: true, data: new Immutable.List() };
  }
  return {
    loading: false,
    data: hoursPerProject.data.reduce((result, value, key) =>
      result.push({
        projectId: value.project,
        customerCode: projects.data.get(key).customer.id,
        hours: value.hours
      })
    , new Immutable.List())
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  getTableBody,
);
