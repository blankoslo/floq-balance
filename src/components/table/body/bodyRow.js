import React from 'react';
import Cell from './bodyCell';
import WriteOff from './writeOff';

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
    <Cell value={''} />
    <Cell value={props.data.invoice_balance_hours.toString()} />
    <Cell value={props.data.expense_money.toString()} />
    <Cell value={props.data.subcontractor_money.toString()} />
    <Cell value={props.data.invoice_balance_money.toString()} />
    <Cell value={''} />
  </tr>
);

BalanceViewBodyRow.propTypes = {
  data: React.PropTypes.object.isRequired,
  onWriteOffChange: React.PropTypes.func.isRequired
};

export default BalanceViewBodyRow;
