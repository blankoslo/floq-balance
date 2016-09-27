import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

const netTurnoverCustomers = (projects, hoursPerProject) => {
  if (projects.loading || hoursPerProject.loading) {
    return { loading: true, data: new Immutable.Map() };
  }
  return {
    loading: false,
    data: hoursPerProject.data.reduce((result, value, key) => {
      const netTurnover = value.invoice_balance_money;
      return result.update(
        projects.data.get(key).customer.id,
        0,
        x => x + netTurnover
      );
    }, new Immutable.Map())
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  netTurnoverCustomers,
);
