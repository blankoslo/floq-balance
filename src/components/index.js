import PropTypes from "prop-types";
import React from "react";
import BalanceViewTitle from "./title";
// import BalanceViewTable from './table';
import ReactTable from "react-table";
import "react-table/react-table.css";

class BalanceView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const add = (a, b) => a + b;

    const columns = [
      { accessor: "customerCode", Header: "Kunde", Footer: <strong>TOTAL:</strong> },
      { accessor: "gross_turnover_customer", Header: "Brutto omsetning kunde" },
      {
        accessor: "net_turnover_customer",
        Header: "Netto omsetning kunde",
        Footer: <strong>{this.props.tableData.footer.net_turnover}</strong>
      },
      {
        accessor: "hourly_rate_customer",
        Header: "OT Kunde",
        Footer: <strong>{this.props.tableData.footer.hourly_rate}</strong>
      },
      { accessor: "projectId", Header: "Engasjement" },
      // { accessor: 'responsible', Header: 'Ansvarlig' },
      {
        accessor: "time_entry_minutes",
        Header: "Timeføring",
        Footer: <strong>{this.props.tableData.footer.time_entry_minutes}</strong>
      },
      {
        accessor: "write_off_minutes",
        Header: "Avskrivning",
        Footer: <strong>{this.props.tableData.footer.write_off_minutes}</strong>
      },
      {
        accessor: "basis_minutes",
        Header: "Grunnlag",
        Footer: <strong>{this.props.tableData.footer.basis_minutes}</strong>
      },
      {
        accessor: "invoice_minutes",
        Header: "Fak. timetall",
        Footer: <strong>{this.props.tableData.footer.invoice_minutes}</strong>
      },
      {
        accessor: "expense_money",
        Header: "Utgifter",
        Footer: <strong>{this.props.tableData.footer.expense}</strong>
      },
      {
        accessor: "subcontractor_money",
        Header: "UL",
        Footer: <strong>{this.props.tableData.footer.subcontractor_expense}</strong>
      },
      {
        accessor: "invoice_money",
        Header: "Honorar",
        Footer: <strong>{this.props.tableData.footer.fee}</strong>
      },
      { accessor: "hourly_rate", Header: "OT" },
      { accessor: "status", Header: "Fak. Status" }
      // { accessor: 'input', Header: 'input' },
    ];

    return (
      <div>
        <BalanceViewTitle
          selectedYear={this.props.title.selectedYear}
          selectedMonth={this.props.title.month}
          navigation={this.props.title.navigation}
        />
        <ReactTable
          data={this.props.tableData.body.list}
          columns={columns}
          defaultPageSize={100}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

BalanceView.propTypes = {
  tableData: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired
};

export default BalanceView;
