import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router";

const MonthNavigation = props => (
  <div className="balance-navigation">
    <Link className="mdl-button mdl-js-button" to={props.navigation.previous}>
      <i className="material-icons">arrow_back</i>
    </Link>
    <div className="month-year-title">
      <h2>
        {props.selectedMonth} {props.selectedYear}
      </h2>
    </div>
    <Link className="mdl-button mdl-js-button" to={props.navigation.next}>
      <i className="material-icons">arrow_forward</i>
    </Link>
  </div>
);

MonthNavigation.propTypes = {
  selectedYear: PropTypes.string.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
};

export default MonthNavigation;
