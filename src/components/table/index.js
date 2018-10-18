import PropTypes from "prop-types";
import React from "react";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

const BalanceViewTable = (props) => (
  <div>
    <table className='balance-table'>
      <Header />
      <Body data={props.tableData.body} />
      <Footer data={props.tableData.footer} />
    </table>
  </div>
);

BalanceViewTable.propTypes = {
  tableData: PropTypes.object.isRequired
};

export default BalanceViewTable;
