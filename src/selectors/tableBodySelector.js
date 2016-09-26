import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import hourlyRateCustomersSelector from './hourlyRateCustomersSelector';
import grossTurnoverCustomersSelector from './grossTurnoverCustomersSelector';
import netTurnoverCustomersSelector from './netTurnoverCustomersSelector';

const getTableBody = (projects, hoursPerProject, hourlyRate, grossTurnover, netTurnover) => {
  if (projects.loading || hoursPerProject.loading || hourlyRate.loading
      || grossTurnover.loading || netTurnover.loading) {
    return { loading: true, data: new Immutable.List() };
  }
  return {
    loading: false,
    data: hoursPerProject.data.reduce((result, value, key) =>
      result.push({
        projectId: value.project,
        customerCode: projects.data.get(key).customer.id,
        time_entry_hours: value.time_entry_hours,
        invoice_balance_hours: value.invoice_balance_hours,
        invoice_balance_money: value.invoice_balance_money,
        write_off_hours: value.write_off_hours,
        expense_money: value.expense_money,
        subcontractor_money: value.subcontractor_money,
        hourly_rate_customer: hourlyRate.data.get(projects.data.get(key).customer.id, 0),
        gross_turnover_customer: grossTurnover.data.get(projects.data.get(key).customer.id, 0),
        net_turnover_customer: netTurnover.data.get(projects.data.get(key).customer.id, 0),
      })
    , new Immutable.List())
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  hourlyRateCustomersSelector,
  grossTurnoverCustomersSelector,
  netTurnoverCustomersSelector,
  getTableBody,
);
