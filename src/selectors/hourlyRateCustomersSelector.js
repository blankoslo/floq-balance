import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

const hourlyRateCustomers = (projects, hoursPerProject) => {
  if (projects.loading || hoursPerProject.loading) {
    return { loading: true, data: new Immutable.Map() };
  }
  return {
    loading: false,
    data: hoursPerProject.data
      .reduce((result, value, key) =>
        result.update(
          projects.data.get(key).customer.id,
          { fee: 0, expense: 0, subcontractor: 0, hours: 0 },
          x => ({
            fee: (x.fee + value.invoice_balance_money),
            expense: (x.expense + value.expense_money),
            subcontractor: (x.subcontractor + value.subcontractor_money),
            hours: (x.hours + value.time_entry_hours),
          })
        ), new Immutable.Map())
      .map(x => (x.hours > 0 && x.fee > 0
        ? ((x.fee - x.expense - x.subcontractor) / x.hours)
        : 0
      ))
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  hourlyRateCustomers,
);
