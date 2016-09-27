import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

const grossTurnoverCustomers = (projects, hoursPerProject) => {
  if (projects.loading || hoursPerProject.loading) {
    return { loading: true, data: new Immutable.Map() };
  }
  return {
    loading: false,
    data: hoursPerProject.data.reduce((result, value, key) => {
      const grossTurnover =
        value.invoice_balance_money - value.expense_money - value.subcontractor_money;
      return result.update(
        projects.data.get(key).customer.id,
        0,
        x => x + grossTurnover
      );
    }, new Immutable.Map())
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  grossTurnoverCustomers,
);
