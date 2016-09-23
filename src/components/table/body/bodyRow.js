import React from 'react';
import Cell from './bodyCell';
import WriteOff from './writeOff';
import Basis from './basis';
import Expense from './expense';
import Fee from './fee';

const BalanceViewBodyRow = props => (
  <tr>
    <Cell
      value={props.data.customerCode.toString()}
    />
    <Cell
      value={props.data.projectId}
    />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={'JAJ'} />
    <Cell value={props.data.time_entry_hours.toString()} />
    <WriteOff
      value={props.data.write_off_hours.toString()}
      onChange={props.onWriteOffChange}
      project={props.data.projectId}
    />
    <Basis timeEntry={props.data.time_entry_hours} writeOff={props.data.write_off_hours} />
    <Cell value={props.data.invoice_balance_hours.toString()} />
    <Expense
      value={props.data.expense_money.toString()}
      onChange={props.onExpenseChange}
      project={props.data.projectId}
      type={'other'}
    />
    <Expense
      value={props.data.subcontractor_money.toString()}
      onChange={props.onExpenseChange}
      project={props.data.projectId}
      type={'subcontractor'}
    />
    <Fee
      value={props.data.invoice_balance_money.toString()}
      onChange={props.onInvoiceBalanceChange}
      billedHours={props.data.invoice_balance_hours}
      project={props.data.projectId}
    />
    <Cell value={''} />
  </tr>
);

BalanceViewBodyRow.propTypes = {
  data: React.PropTypes.object.isRequired,
  onWriteOffChange: React.PropTypes.func.isRequired,
  onExpenseChange: React.PropTypes.func.isRequired,
  onInvoiceBalanceChange: React.PropTypes.func.isRequired,
};

export default BalanceViewBodyRow;
