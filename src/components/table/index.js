import React from 'react';
import Header from './header';
import Body from './body';

const BalanceViewTable = (props) => (
  <div>
    <table className='balance-table'>
      <Header />
      <Body data={props.tableBody} />
    </table>
  </div>
);

BalanceViewTable.propTypes = {
  tableBody: React.PropTypes.object.isRequired
};

export default BalanceViewTable;
