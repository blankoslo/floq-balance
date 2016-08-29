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
  projectId: React.PropTypes.string
};

export default BalanceViewBodyRow;
