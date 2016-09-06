import React from 'react';
import BalanceViewTitle from './title';
import BalanceViewTable from './table';

const BalanceView = (props) => (
  <div>
    <BalanceViewTitle
      selectedYear={props.title.year}
      selectedMonth={props.title.month}
    />
    <BalanceViewTable tableBody={props.tableBody} />
  </div>
);

BalanceView.propTypes = {
  tableBody: React.PropTypes.object.isRequired,
  title: React.PropTypes.object.isRequired,
};

export default BalanceView;
