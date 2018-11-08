import PropTypes from "prop-types";
import React from "react";

const BalanceViewBodyRow = props => <th title={props.title}>{props.columnName}</th>;

BalanceViewBodyRow.propTypes = {
  columnName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default BalanceViewBodyRow;
