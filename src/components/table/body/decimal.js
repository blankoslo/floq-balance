import React from 'react';

const BalanceViewBodyCell = props => (
  <td className='static-data'>
    {Math.abs(props.value) < 0.1 ? '' : props.value.toFixed(props.decimals || 1)}
  </td>
);

BalanceViewBodyCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  decimals: React.PropTypes.number,
};

export default BalanceViewBodyCell;
