import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import tableBodySelector from './tableBodySelector';

const sum = (list, element) =>
  list.reduce((result, item) => result + item[element], 0);

const getFooter = (tableData) => {
  if (tableData.loading) {
    return { loading: true, data: new Immutable.List() };
  }
  const { data } = tableData;
  const props = {
    time_entry_minutes: sum(data, 'time_entry_minutes'),
    write_off_minutes: sum(data, 'write_off_minutes'),
    invoice_minutes: sum(data, 'invoice_minutes'),
    expense: sum(data, 'expense_money'),
    subcontractor_expense: sum(data, 'subcontractor_money'),
    fee: sum(data, 'invoice_money'),
  };

  const netTurnoverCustomer = props.fee - props.expense - props.subcontractor_expense;

  return {
    loading: false,
    data: {
      ...props,
      net_turnover: netTurnoverCustomer,
      hourly_rate: netTurnoverCustomer / (props.time_entry_minutes / 60),
      basis_minutes: props.time_entry_minutes - props.write_off_minutes,
    }
  };
};

export default createSelector(
  tableBodySelector,
  getFooter,
);
