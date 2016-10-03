import React from 'react';

import WriteOff from './editables/writeOff';
import Expense from './editables/expense';
import Fee from './editables/fee';
import BilledHours from './editables/billedHours';
import InvoiceStatus from './editables/invoiceStatus';

import Decimal from './decimal';
import Basis from './basis';
import HourlyRate from './hourlyRate';

const BalanceViewBodyRow = props => (
  <tr>
    <td className='static-data'>{props.data.customerCode}</td>
    <Decimal value={props.data.gross_turnover_customer} />
    <Decimal value={props.data.net_turnover_customer} />
    <Decimal value={props.data.hourly_rate_customer} />
    <td className='static-data'>{props.data.projectId}</td>
    <td className='static-data'>JAJ</td>
    <Decimal value={props.data.time_entry_minutes / 60} />
    <WriteOff
      value={props.data.write_off_minutes}
      onChange={props.onWriteOffChange}
      project={props.data.projectId}
    />
    <Basis
      timeEntryMinutes={props.data.time_entry_minutes}
      writeOffMinutes={props.data.write_off_minutes}
    />
    <BilledHours
      value={props.data.invoice_balance_minutes}
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
      input={props.data.input.fee}
      onInputChange={props.onInputChange}
      onValueChange={props.onInvoiceBalanceChange}
      billedMinutes={props.data.invoice_balance_minutes}
      project={props.data.projectId}
    />
    <HourlyRate
      fee={props.data.invoice_balance_money}
      expense={props.data.expense_money + props.data.subcontractor_money}
      timeEntryMinutes={props.data.time_entry_minutes}
    />
    <InvoiceStatus
      status={props.data.status}
      onChange={props.onStatusChange}
      project={props.data.projectId}
    />
  </tr>
);

BalanceViewBodyRow.propTypes = {
  data: React.PropTypes.object.isRequired,
  onWriteOffChange: React.PropTypes.func.isRequired,
  onExpenseChange: React.PropTypes.func.isRequired,
  onInvoiceBalanceChange: React.PropTypes.func.isRequired,
  onStatusChange: React.PropTypes.func.isRequired,
  onInputChange: React.PropTypes.func.isRequired,
};

export default BalanceViewBodyRow;
