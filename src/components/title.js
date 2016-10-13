import React from 'react';
import { Link } from 'react-router';

const BalanceViewTitle = (props) => (
  <div className='balance-navigation'>
    <Link
      className='mdl-button mdl-js-button'
      to={props.navigation.previous}
    >
      <i className='material-icons'>arrow_back</i>
    </Link>
    <div style={{ textAlign: 'center' }}>
      <h2>{props.selectedMonth} {props.selectedYear}</h2>
    </div>
    <Link
      className='mdl-button mdl-js-button'
      to={props.navigation.next}
    >
      <i className='material-icons'>arrow_forward</i>
    </Link>
  </div>
);

BalanceViewTitle.propTypes = {
  selectedYear: React.PropTypes.string.isRequired,
  selectedMonth: React.PropTypes.string.isRequired,
  navigation: React.PropTypes.object.isRequired,
};

export default BalanceViewTitle;
