import React from 'react';
import BalanceViewTitle from './title';
import BalanceViewTable from './table';

const BalanceView = (props) => (
  <div>
    <BalanceViewTitle
      selectedYear={props.title.year}
      selectedMonth={props.title.month}
      navigation={props.title.navigation}
    />
    <BalanceViewTable tableData={props.tableData} />
  </div>
);

BalanceView.propTypes = {
  tableData: React.PropTypes.object.isRequired,
  title: React.PropTypes.object.isRequired,
};

export default BalanceView;
