import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

const grossTurnoverCustomers = (projects, hoursPerProject) => {
  if (projects.loading || hoursPerProject.loading) {
    return { loading: true, data: new Immutable.Map() };
  }
  return {
    loading: false,
    data: hoursPerProject.data.reduce((result, value, key) =>
      result.update(
        projects.data.get(key).customer.id,
        0,
        x => x + value.invoice_balance_money
      ), new Immutable.Map()
    )
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  grossTurnoverCustomers,
);
