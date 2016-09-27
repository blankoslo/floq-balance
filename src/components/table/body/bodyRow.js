import React from 'react';
import Money from './calculatedMoney';
import WriteOff from './writeOff';
import Basis from './basis';
import Expense from './expense';
import Fee from './fee';
import BilledHours from './billedHours';
import HourlyRate from './hourlyRate';

const BalanceViewBodyRow = props => (
  <tr>
    <td className='static-data'>{props.data.customerCode}</td>
    <td className='static-data'>{props.data.projectId}</td>
    <Money value={props.data.gross_turnover_customer} />
    <Money value={props.data.net_turnover_customer} />
    <Money value={props.data.hourly_rate_customer} />
    <td className='static-data'>JAJ</td>
    <Money value={props.data.time_entry_hours} />
    <WriteOff
      value={props.data.write_off_hours}
      onChange={props.onWriteOffChange}
      project={props.data.projectId}
    />
    <Basis timeEntry={props.data.time_entry_hours} writeOff={props.data.write_off_hours} />
    <BilledHours
      value={props.data.invoice_balance_hours}
      onChange={props.onInvoiceBalanceChange}
      fee={props.data.invoice_balance_money}
      project={props.data.projectId}
    />
    <Expense
      value={props.data.expense_money}
      onChange={props.onExpenseChange}
      project={props.data.projectId}
      type={'other'}
    />
    <Expense
      value={props.data.subcontractor_money}
      onChange={props.onExpenseChange}
      project={props.data.projectId}
      type={'subcontractor'}
    />
    <Fee
      value={props.data.invoice_balance_money}
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
