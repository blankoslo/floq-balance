import React from 'react';
import BalanceViewTitle from './title';
import BalanceViewTable from './table';

const BalanceView = (props) => (
  <div>
    <BalanceViewTitle
      selectedMonth={'Juli'}
      selectedYear={2016}
    />
    <BalanceViewTable projects={props.projects} />
  </div>
);

BalanceView.propTypes = {
  projects: React.PropTypes.object.isRequired
};

export default BalanceView;
