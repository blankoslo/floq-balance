import React from 'react';

const BalanceViewBodyRow = (props) => (
  <th>
    {props.columnName}
  </th>
);

BalanceViewBodyRow.propTypes = {
  columnName: React.PropTypes.string.isRequired,
};

export default BalanceViewBodyRow;
