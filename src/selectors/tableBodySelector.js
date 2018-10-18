import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import hourlyRateCustomersSelector from './hourlyRateCustomersSelector';
import grossTurnoverCustomersSelector from './grossTurnoverCustomersSelector';
import netTurnoverCustomersSelector from './netTurnoverCustomersSelector';

const initials = name =>
  name.split(' ').map(s => s.charAt(0).toUpperCase()).join('');

const getTableBody = (projects, hoursPerProject, input, hourlyRate, grossTurnover, netTurnover) => {
  if (projects.loading || hoursPerProject.loading || input.loading || hourlyRate.loading
      || grossTurnover.loading || netTurnover.loading) {
    return { loading: true, data: new Immutable.List() };
  }
  const activeProjects = projects.data.filter(x => x.active === true);
  return {
    loading: false,
    data: hoursPerProject.data
      .filter((v, k) => activeProjects.has(k) || v.time_entry_minutes > 0)
      .reduce((result, value, key) => {
        const project = projects.data.get(key);
        const name = `${project.responsible.first_name} ${project.responsible.last_name}`;
        const responsible = {
          name,
          initials: initials(name)
        };
        const hourlyRateProject = value.time_entry_minutes
          ? (value.invoice_balance_money - value.expense_money - value.subcontractor_money)
            / (value.time_entry_minutes / 60) || 0
          : 0;
        return result.push({
          projectId: value.project,
          customerCode: projects.data.get(key).customer.id,
          gross_turnover_customer: grossTurnover.data.get(projects.data.get(key).customer.id, 0),
          net_turnover_customer: netTurnover.data.get(projects.data.get(key).customer.id, 0),
          hourly_rate_customer: hourlyRate.data.get(projects.data.get(key).customer.id, 0),
          responsible,
          time_entry_minutes: value.time_entry_minutes,
          invoice_minutes: value.invoice_balance_minutes,
          invoice_money: value.invoice_balance_money,
          write_off_minutes: value.write_off_minutes,
          basis_minutes: value.time_entry_minutes - value.write_off_minutes,
          expense_money: value.expense_money,
          subcontractor_money: value.subcontractor_money,
          hourly_rate: hourlyRateProject,
          status: value.status,
          input: input.data.get(key),
        });
      }, new Immutable.List())
      .toJS()
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
