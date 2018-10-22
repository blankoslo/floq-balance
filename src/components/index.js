import PropTypes from "prop-types";
import React, { isValidElement } from "react";
import BalanceViewTitle from "./title";
// import BalanceViewTable from './table';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
  ExpenseCell,
  WriteOffCell,
  FeeCell,
  BilledHoursCell,
  MonetaryStaticCell,
  InvoiceStatusCell,
  DurationStaticCell,
  TextStaticCell
} from "./editableCells";

class BalanceView extends React.Component {
  constructor(props) {
    super(props);
  }

  extractCommonCellProps = cellInfo => {
    const data = this.props.tableData.body.list;
    const rowIdx = cellInfo.index;
    const columnId = cellInfo.column.id;
    const projectId = data[rowIdx]["projectId"];
    const value = data[rowIdx][columnId];

    return { data, rowIdx, columnId, projectId, value };
  };

  render() {
    const columns = [
      {
        accessor: "customerCode",
        Header: "Kunde",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <TextStaticCell value={value} />;
        }
      },
      {
        accessor: "gross_turnover_customer",
        Header: "Brutto omsetning kunde",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <MonetaryStaticCell value={value} />;
        }
      },
      {
        accessor: "net_turnover_customer",
        Header: "Netto omsetning kunde",
        Footer: <MonetaryStaticCell value={this.props.tableData.footer.net_turnover} />,
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <MonetaryStaticCell value={value} />;
        }
      },
      {
        accessor: "hourly_rate_customer",
        Header: "OT Kunde",
        Footer: <MonetaryStaticCell value={this.props.tableData.footer.hourly_rate} decimals={2} />,
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <MonetaryStaticCell value={value} />;
        }
      },
      {
        accessor: "projectId",
        Header: "Engasjement",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <TextStaticCell value={value} />;
        }
      },
      {
        accessor: "responsible",
        Header: "Ansvarlig",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <TextStaticCell value={value["initials"]} />;
        }
      },
      {
        accessor: "time_entry_minutes",
        Header: "Timeføring",
        Footer: (
          <DurationStaticCell value={this.props.tableData.footer.time_entry_minutes} hours={true} />
        ),
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <DurationStaticCell value={value} hours={true} decimals={1} />;
        }
      },
      {
        accessor: "write_off_minutes",
        Header: "Avskrivning",
        Footer: (
          <DurationStaticCell value={this.props.tableData.footer.write_off_minutes} hours={true} />
        ),
        Cell: cellInfo => {
          const { data, columnId, projectId, value } = this.extractCommonCellProps(cellInfo);
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
      },
      {
        accessor: "basis_minutes",
        Header: "Grunnlag",
        Footer: (
          <DurationStaticCell value={this.props.tableData.footer.basis_minutes} hours={true} />
        ),
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <DurationStaticCell value={value} hours={true} decimals={1} />;
        }
      },
      {
        accessor: "invoice_minutes",
        Header: "Fak. timetall",
        Footer: (
          <DurationStaticCell value={this.props.tableData.footer.invoice_minutes} hours={true} />
        ),
        Cell: cellInfo => {
          const { data, columnId, projectId, value, rowIdx } = this.extractCommonCellProps(
            cellInfo
          );
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
      },
      {
        accessor: "expense_money",
        Header: "Utgifter",
        Footer: <MonetaryStaticCell value={this.props.tableData.footer.expense} />,
        Cell: cellInfo => {
          const { data, columnId, projectId, value } = this.extractCommonCellProps(cellInfo);
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
      },
      {
        accessor: "subcontractor_money",
        Header: "UL",
        Footer: <MonetaryStaticCell value={this.props.tableData.footer.subcontractor_expense} />,
        Cell: cellInfo => {
          const { data, columnId, projectId, value } = this.extractCommonCellProps(cellInfo);
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
      },
      {
        accessor: "invoice_money",
        Header: "Honorar",
        Footer: <MonetaryStaticCell value={this.props.tableData.footer.fee} />,
        Cell: cellInfo => {
          const { data, columnId, projectId, value, rowIdx } = this.extractCommonCellProps(
            cellInfo
          );
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
      },
      {
        accessor: "hourly_rate",
        Header: "OT",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <MonetaryStaticCell value={value} />;
        }
      },
      {
        accessor: "status",
        Header: "Fak. Status",
        Cell: cellInfo => {
          const { data, projectId, rowIdx } = this.extractCommonCellProps(cellInfo);
          console.log(data);
          return (
            <InvoiceStatusCell
              status={data[rowIdx]["status"]}
              onChange={this.props.tableData.body.onStatusChange}
              projectId={projectId}
            />
          );
        }
      }
    ];

    const heightLock = { height: window.innerHeight - 64 - 45 };

    return (
      <div>
        <BalanceViewTitle
          selectedYear={this.props.title.selectedYear}
          selectedMonth={this.props.title.month}
          navigation={this.props.title.navigation}
        />
        <ReactTable
          style={heightLock}
          data={this.props.tableData.body.list}
          columns={columns}
          defaultPageSize={100}
          className="-striped -highlight"
          showPaginationBottom={false}
          getTheadThProps={() => {
            return { style: { outline: "none" } };
          }}
          getTrProps={() => {
            return { style: { height: "45px" } };
          }}
          getTdProps={() => {
            return { style: { display: "flex", justifyContent: "left", alignItems: "center" } };
          }}
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
