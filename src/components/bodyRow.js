import React from 'react';
import BalanceViewBodyCell from './bodyCell';

const BalanceViewBodyRow = () => (
  <tr>
    {Array(12).fill(1).map((e, index) =>
      <BalanceViewBodyCell
        key={index}
      />)}
  </tr>
);

BalanceViewBodyRow.propTypes = {

};

export default BalanceViewBodyRow;
