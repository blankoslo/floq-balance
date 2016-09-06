import React from 'react';

const BalanceViewBodyCell = props => (
  <td>
    {props.value}
  </td>
);

BalanceViewBodyCell.propTypes = {
  value: React.PropTypes.string
};

export default BalanceViewBodyCell;
