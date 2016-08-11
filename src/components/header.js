import React from 'react';
import Col from './headerCol';


const BalanceViewHeader = (props) => (
  <thead>
    <tr>
      {props.columnNames.map((cn, index) => <Col columnName={cn} key={index} />)}
    </tr>
  </thead>
);

BalanceViewHeader.propTypes = {
  columnNames: React.PropTypes.array.isRequired,
};

export default BalanceViewHeader;
