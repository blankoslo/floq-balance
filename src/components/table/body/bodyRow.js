import React from 'react';
import Cell from './bodyCell';
import WriteOff from './writeOff';
import Basis from './basis';
import Expense from './expense';
import Fee from './fee';
import BilledHours from './billedHours';
import HourlyRate from './hourlyRate';

const BalanceViewBodyRow = props => (
  <tr>
    <td>{props.data.customerCode}</td>
    <td>{props.data.projectId}</td>
    <Cell value={props.data.net_turnover_customer} />
    <Cell value={props.data.gross_turnover_customer} />
    <Cell value={props.data.hourly_rate_customer} />
    <td>JAJ</td>
    <Cell value={props.data.time_entry_hours} />
    <WriteOff
      value={props.data.write_off_hours.toString()}
      onChange={props.onWriteOffChange}
      project={props.data.projectId}
    />
    <Basis timeEntry={props.data.time_entry_hours} writeOff={props.data.write_off_hours} />
    <BilledHours
      value={props.data.invoice_balance_hours.toString()}
      onChange={props.onInvoiceBalanceChange}
      fee={props.data.invoice_balance_money}
      project={props.data.projectId}
    />
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
    <HourlyRate
      fee={props.data.invoice_balance_money}
      expense={props.data.expense_money + props.data.subcontractor_money}
      timeEntry={props.data.time_entry_hours}
    />
  </tr>
);

BalanceViewBodyRow.propTypes = {
  data: React.PropTypes.object.isRequired,
  onWriteOffChange: React.PropTypes.func.isRequired,
  onExpenseChange: React.PropTypes.func.isRequired,
  onInvoiceBalanceChange: React.PropTypes.func.isRequired,
};

export default BalanceViewBodyRow;
