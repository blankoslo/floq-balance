import React from 'react';
import BalanceViewTitle from './title';
import BalanceViewTable from './table';

const BalanceView = () => (
  <div>
    <BalanceViewTitle
      selectedMonth={'Juli'}
      selectedYear={2016}
    />
    <BalanceViewTable />
  </div>
);

BalanceView.propTypes = {
};

export default BalanceView;
