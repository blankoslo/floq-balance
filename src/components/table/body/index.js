import React from 'react';
import Row from './row';

const BalanceViewBody = (props) => (
  <tbody>
    {props.data.list.map(row =>
      <Row
        data={row}
        onWriteOffChange={props.data.onWriteOffChange}
        onExpenseChange={props.data.onExpenseChange}
        onInvoiceBalanceChange={props.data.onInvoiceBalanceChange}
        onStatusChange={props.data.onStatusChange}
        onInputChange={props.data.onInputChange}
        key={row.projectId}
      />)}
  </tbody>
);

BalanceViewBody.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BalanceViewBody;
