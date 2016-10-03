import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import hourlyRateCustomersSelector from './hourlyRateCustomersSelector';
import grossTurnoverCustomersSelector from './grossTurnoverCustomersSelector';
import netTurnoverCustomersSelector from './netTurnoverCustomersSelector';

const getTableBody = (projects, hoursPerProject, input, hourlyRate, grossTurnover, netTurnover) => {
  if (projects.loading || hoursPerProject.loading || input.loading || hourlyRate.loading
      || grossTurnover.loading || netTurnover.loading) {
    return { loading: true, data: new Immutable.List() };
  }
  return {
    loading: false,
    data: hoursPerProject.data.reduce((result, value, key) =>
      result.push({
        projectId: value.project,
        customerCode: projects.data.get(key).customer.id,
        time_entry_minutes: value.time_entry_minutes,
        invoice_balance_minutes: value.invoice_balance_minutes,
        invoice_balance_money: value.invoice_balance_money,
        write_off_minutes: value.write_off_minutes,
        expense_money: value.expense_money,
        subcontractor_money: value.subcontractor_money,
        hourly_rate_customer: hourlyRate.data.get(projects.data.get(key).customer.id, 0),
        gross_turnover_customer: grossTurnover.data.get(projects.data.get(key).customer.id, 0),
        net_turnover_customer: netTurnover.data.get(projects.data.get(key).customer.id, 0),
        status: value.status,
        input: input.data.get(key),
      })
    , new Immutable.List())
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  state => state.input,
  hourlyRateCustomersSelector,
  grossTurnoverCustomersSelector,
  netTurnoverCustomersSelector,
  getTableBody,
);
