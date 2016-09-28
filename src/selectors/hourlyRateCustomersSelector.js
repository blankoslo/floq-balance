import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

const hourlyRateCustomers = (projects, hoursPerProject) => {
  if (projects.loading || hoursPerProject.loading) {
    return { loading: true, data: new Immutable.Map() };
  }
  return {
    loading: false,
    data: hoursPerProject.data.reduce((result, value, key) => {
      const money = value.invoice_balance_money - value.expense_money - value.subcontractor_money;
      const hours = value.time_entry_hours;
      return result.update(
        projects.data.get(key).customer.id,
        { money: 0, hours: 0 },
        x => ({ money: (x.money + money), hours: (x.hours + hours) })
      );
    }, new Immutable.Map())
    .map(x => (x.hours ? (x.money / x.hours) : 0))
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  hourlyRateCustomers,
);
