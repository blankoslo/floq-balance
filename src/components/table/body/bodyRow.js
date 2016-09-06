import React from 'react';
import Cell from './bodyCell';

const BalanceViewBodyRow = props => (
  <tr>
    <Cell
      value={props.project.customer.name}
    />
    <Cell
      value={props.project.id}
    />
  </tr>
);

BalanceViewBodyRow.propTypes = {
  project: React.PropTypes.object.isRequired
};

export default BalanceViewBodyRow;
