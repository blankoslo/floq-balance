import React from 'react';

const BalanceViewBodyCell = props => (
  <td>
    {!props.onChange
      ? props.value
      : <input type='text' value={props.value} onChange={e => props.onChange(e.target.value)} />
    }
  </td>
);

BalanceViewBodyCell.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
};

export default BalanceViewBodyCell;
