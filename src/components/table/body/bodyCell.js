import React from 'react';

const BalanceViewBodyCell = props => (
  <td>{props.value}</td>
);

BalanceViewBodyCell.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
};

export default BalanceViewBodyCell;
