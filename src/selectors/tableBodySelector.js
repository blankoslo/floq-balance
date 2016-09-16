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
        time_entry_hours: value.time_entry_hours,
        invoice_balance_hours: value.invoice_balance_hours,
        invoice_balance_money: value.invoice_balance_money,
        write_off_hours: value.write_off_hours,
        expense_money: value.expense_money,
        subcontractor_money: value.subcontractor_money,
      })
    , new Immutable.List())
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  getTableBody,
);
