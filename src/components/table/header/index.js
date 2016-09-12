import React from 'react';
import Col from './headerCol';


const BalanceViewHeader = (props) => (
  <thead>
    <tr>
      {props.columnNames.map(cn => <Col columnName={cn} key={cn} />)}
    </tr>
  </thead>
);

BalanceViewHeader.propTypes = {
  columnNames: React.PropTypes.object.isRequired,
};

export default BalanceViewHeader;
