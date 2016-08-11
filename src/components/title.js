import React from 'react';

const BalanceViewTitle = (props) => (
  <div style={{ textAlign: 'center' }}>
    <h2>{props.selectedMonth} {props.selectedYear}</h2>
  </div>
);

BalanceViewTitle.propTypes = {
  selectedYear: React.PropTypes.number.isRequired,
  selectedMonth: React.PropTypes.string.isRequired,
};

export default BalanceViewTitle;
