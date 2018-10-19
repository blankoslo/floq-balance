import PropTypes from "prop-types";
import React, { isValidElement } from "react";
import BalanceViewTitle from "./title";
// import BalanceViewTable from './table';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ExpenseCell, WriteOffCell, FeeCell, BilledHoursCell } from "./editableCells";

class BalanceView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderEditableCell = cellInfo => {
    const data = this.props.tableData.body.list;
    const rowIdx = cellInfo.index;
    const columnId = cellInfo.column.id;
    const projectId = data[rowIdx]["projectId"];

    const value = data[rowIdx][columnId];

    if (columnId === "expense_money") {
      return (
        <ExpenseCell
          projectId={projectId}
          columnId={columnId}
          onInputChange={this.props.tableData.body.onInputChange}
          onValueChange={this.props.tableData.body.onExpenseChange}
          value={value}
          input={data[cellInfo.index]["input"]["expense"]}
          type={"other"}
        />
      );
    }
    if (columnId === "write_off_minutes") {
      return (
        <WriteOffCell
          projectId={projectId}
          columnId={columnId}
          onInputChange={this.props.tableData.body.onInputChange}
          onValueChange={this.props.tableData.body.onWriteOffChange}
          value={value}
          input={data[cellInfo.index]["input"]["writeOff"]}
        />
      );
    }
    if (columnId === "invoice_money") {
      return (
        <FeeCell
          projectId={projectId}
          columnId={columnId}
          onInputChange={this.props.tableData.body.onInputChange}
          onValueChange={this.props.tableData.body.onInvoiceBalanceChange}
          value={value}
          input={data[cellInfo.index]["input"]["fee"]}
          billedMinutes={data[rowIdx]["invoice_minutes"]}
        />
      );
    }
    if (columnId === "invoice_minutes") {
      return (
        <BilledHoursCell
          projectId={projectId}
          columnId={columnId}
          onInputChange={this.props.tableData.body.onInputChange}
          onValueChange={this.props.tableData.body.onInvoiceBalanceChange}
          value={value}
          input={data[cellInfo.index]["input"]["billedHours"]}
          fee={data[rowIdx]["invoice_money"]}
        />
      );
    }
    if (columnId === "responsible") {
      return <div>{data[cellInfo.index][columnId]["initials"]}</div>;
    }
    if (columnId === "subcontractor_money") {
      return (
        <ExpenseCell
          projectId={projectId}
          columnId={columnId}
          onInputChange={this.props.tableData.body.onInputChange}
          onValueChange={this.props.tableData.body.onExpenseChange}
          value={value}
          input={data[cellInfo.index]["input"]["subcontractor"]}
          type={"subcontractor"}
        />
      );
    }
  };

  renderStaticCell = cellInfo => {
    const data = this.props.tableData.body.list;
    const rowIdx = cellInfo.index;
    const columnId = cellInfo.column.id;
    const projectId = data[rowIdx]["projectId"];

    const value = data[rowIdx][columnId];

    const decimals = input => (input === undefined || input === null ? 1 : input);

    if (columnId === "responsible") {
      return <div>{data[cellInfo.index][columnId]["initials"]}</div>;
    }
    if (columnId === "time_entry_minutes" || columnId === "basis_minutes") {
      const hours = value / 60;
      return <div>{Math.abs(hours) < 0.1 ? "" : hours.toFixed(decimals(1))}</div>;
    }
    if (columnId === "gross_turnover_customer" || columnId === "net_turnover_customer") {
      return <div>{Math.abs(value) < 0.1 ? "" : value.toFixed(0)}</div>;
    }
    if (columnId === "hourly_rate_customer" || columnId === "hourly_rate") {
      return <div>{Math.abs(value) < 0.1 ? "" : value.toFixed(decimals(1))}</div>;
    }
  };

  render() {
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
        Footer: <strong>{this.props.tableData.footer.expense}</strong>,
        Cell: this.renderEditable
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

    console.log(this.props.tableData);

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
