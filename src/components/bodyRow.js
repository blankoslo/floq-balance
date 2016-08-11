import React from 'react';
import BalanceViewBodyCell from './bodyCell';

const BalanceViewBodyRow = (props) => (
  <tr>
    <BalanceViewBodyCell
      value={props.projectId}
    />
  </tr>
);

BalanceViewBodyRow.propTypes = {
  projectId: React.PropTypes.string,
  key: React.PropTypes.number
};

export default BalanceViewBodyRow;
