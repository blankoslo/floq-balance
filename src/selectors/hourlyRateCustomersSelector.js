import { createSelector } from "reselect";
import * as Immutable from "immutable";

const hourlyRateCustomers = (projects, hoursPerProject) => {
  if (projects.loading || hoursPerProject.loading) {
    return { loading: true, data: new Immutable.Map() };
  }
  return {
    loading: false,
    data: hoursPerProject.data
      .reduce(
        (result, value, key) =>
          result.update(
            projects.data.get(key).customer.id,
            { fee: 0, expense: 0, subcontractor: 0, minutes: 0 },
            x => ({
              fee: x.fee + value.invoice_balance_money,
              expense: x.expense + value.expense_money,
              subcontractor: x.subcontractor + value.subcontractor_money,
              minutes: x.minutes + value.time_entry_minutes
            })
          ),
        new Immutable.Map()
      )
      .map(
        x =>
          x.minutes > 0 && x.fee > 0 ? (x.fee - x.expense - x.subcontractor) / (x.minutes / 60) : 0
      )
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  hourlyRateCustomers
);
