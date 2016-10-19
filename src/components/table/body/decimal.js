import React from 'react';

const decimals = input => (input === undefined || input === null ? 1 : input);

const BalanceViewBodyCell = props => (
  <td className='uneditable'>
    {Math.abs(props.value) < 0.1
      ? ''
      : props.value.toFixed(decimals(props.decimals))}
  </td>
);

BalanceViewBodyCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  decimals: React.PropTypes.number,
};

export default BalanceViewBodyCell;
