import PropTypes from "prop-types";
import React, { isValidElement } from "react";
import BalanceViewTitle from "./title";
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
  TextStaticCell,
  statusLabelMap
} from "./editableCells";

const numberColumns = new Map([
  ["net_turnover_customer", true],
  ["gross_turnover_customer", true],
  ["hourly_rate_customer", true],
  ["expense_money", true],
  ["subcontractor_money", true],
  ["invoice_money", true],
  ["time_entry_minutes", true],
  ["write_off_minutes", true],
  ["basis_minutes", true],
  ["invoice_minutes", true],
  ["hourly_rate", true]
]);

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const MultipleSelectFilter = ({ filter, onChange, filterValues, labelMap }) => (
  <Select
    onChange={e => onChange(e.target.value)}
    value={filter ? filter.value : []}
    multiple={true}
    style={{ flexGrow: 1 }}
  >
    {filterValues.map((value, key) => {
      return (
        <MenuItem key={key} value={value}>
          {labelMap ? labelMap.get(value) : value}
        </MenuItem>
      );
    })}
  </Select>
);

const multipleSelectFilterMethod = (filter, row, valueKey) => {
  if (filter.value.length === 0) return true;
  const filterMap = new Map(filter.value.map(value => [value, true]));
  if (valueKey && filterMap.has(row[filter.id][valueKey])) return true;
  if (filterMap.has(row[filter.id])) return true;

  return false;
};

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
        },
        filterMethod: multipleSelectFilterMethod,
        Filter: ({ filter, onChange }) => {
          const filterValues = this.props.tableData.body.filterFieldValues.uniqueCustomerCodes;
          return (
            <MultipleSelectFilter onChange={onChange} filter={filter} filterValues={filterValues} />
          );
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
          const { value, projectId } = this.extractCommonCellProps(cellInfo);
          return <TextStaticCell value={value} />;
        }
      },
      {
        accessor: "responsible",
        Header: "Ansvarlig",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <TextStaticCell value={value["initials"]} />;
        },
        filterMethod: (filter, row) => {
          return multipleSelectFilterMethod(filter, row, "initials");
        },
        Filter: ({ filter, onChange }) => {
          const filterValues = this.props.tableData.body.filterFieldValues
            .uniqueResponsibleInitials;
          return (
            <MultipleSelectFilter onChange={onChange} filter={filter} filterValues={filterValues} />
          );
        }
      },
      {
        accessor: "time_entry_minutes",
        Header: "Timeføring",
        Footer: (
          <DurationStaticCell value={this.props.tableData.footer.time_entry_minutes} hours={true} />
        ),
        Cell: cellInfo => {
          const { value, projectId } = this.extractCommonCellProps(cellInfo);
          return (
            <DurationStaticCell
              value={value}
              hours={true}
              decimals={1}
              className={"time-entry-minutes-cell"}
              onClick={() => {
                this.props.tableData.body.getMonthlyTimeTrackingReport(projectId);
              }}
            />
          );
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
          return (
            <InvoiceStatusCell
              status={data[rowIdx]["status"]}
              onChange={this.props.tableData.body.onStatusChange}
              projectId={projectId}
            />
          );
        },
        filterMethod: (filter, row) => {
          return multipleSelectFilterMethod(filter, row, undefined);
        },
        Filter: ({ filter, onChange }) => {
          const filterValues = this.props.tableData.body.filterFieldValues.uniqueStatuses;
          return (
            <MultipleSelectFilter
              onChange={onChange}
              filter={filter}
              filterValues={filterValues}
              labelMap={statusLabelMap}
            />
          );
        }
      }
    ];

    const heightLock = { height: window.innerHeight - 64 - 45 };

    return (
      <div>
        <BalanceViewTitle
          selectedYear={this.props.title.year}
          selectedMonth={this.props.title.month}
          navigation={this.props.title.navigation}
        />
        <ReactTable
          filterable
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
          getTdProps={(state, rowInfo, column, instance) => {
            let style = { display: "flex", justifyContent: "center", alignItems: "center" };

            if (numberColumns.has(column.id)) {
              style = Object.assign(style, { justifyContent: "flex-end" });
            }
            return { style: style };
          }}
          getTfootTdProps={(state, rowInfo, column, instance) => {
            let style = { display: "flex", justifyContent: "flex-end", alignItems: "center" };

            return { style: style };
          }}
          getTheadFilterThProps={(state, rowInfo, column, instance) => {
            let style = { display: "flex" };
            console.log(style);
            return { style: style };
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
