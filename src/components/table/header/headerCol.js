import React from 'react';

const BalanceViewBodyRow = (props) => (
  <th title={props.title}>
    {props.columnName}
  </th>
);

BalanceViewBodyRow.propTypes = {
  columnName: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default BalanceViewBodyRow;
