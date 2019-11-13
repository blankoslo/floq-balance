import PropTypes from "prop-types";
import React from "react";
import MonthNavigation from "./title";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { EditableCell } from "./cells/editableCell";
import { InvoiceStatusCell, statusLabelMap } from "./cells/invoiceStatusCell";
import { MonetaryStaticCell, DurationStaticCell, TextStaticCell } from "./cells/staticCells";
import MonthAggregates from "./table/footer";

const isValidAmount = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);
const isValidHours = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

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
    const projectId = data.get(rowIdx)["projectId"];
    const value = data.get(rowIdx)[columnId];

    return { data, rowIdx, columnId, projectId, value };
  };

  render() {
    const columns = [
      {
        accessor: "customerCode",
        Header: "Kunde",
        className: "cell-rt-js",
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
        className: "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <MonetaryStaticCell value={value} />;
        }
      },
      {
        accessor: "net_turnover_customer",
        Header: "Netto omsetning kunde",
        className: "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <MonetaryStaticCell value={value} />;
        }
      },
      {
        accessor: "hourly_rate_customer",
        Header: "OT Kunde",
        className: "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <MonetaryStaticCell value={value} />;
        }
      },
      {
        accessor: "projectId",
        Header: "Engasjement",
        className: "cell-rt-js",
        Cell: cellInfo => {
          const { data, columnId, projectId, value, rowIdx } = this.extractCommonCellProps(
            cellInfo
          );
          const hoverText = data.get(rowIdx)["projectName"];
          return <TextStaticCell value={value} hoverText={hoverText} />;
        }
      },
      {
        accessor: "responsible",
        Header: "Ansvarlig",
        className: "cell-rt-js",
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
        className: "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { value, projectId } = this.extractCommonCellProps(cellInfo);
          return (
            <DurationStaticCell
              value={value}
              hours={true}
              decimals={1}
              className={"static-cell time-entry-minutes-cell"}
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
        className: this.props.isAdmin
          ? "cell-rt-js cell-rt-js-static" : "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { data, columnId, projectId, value } = this.extractCommonCellProps(cellInfo);
          const staticCellRef = React.createRef();
          return (
            <EditableCell
              projectId={projectId}
              columnId={columnId}
              onInputChange={this.props.tableData.body.onInputChange}
              onValueChange={this.props.tableData.body.onWriteOffChange}
              value={value}
              inputValidator={isValidHours}
              input={data.get(cellInfo.index)["input"][columnId]}
              isAdmin={this.props.isAdmin}
            >
              <DurationStaticCell
                ref={staticCellRef}
                value={value}
                className={this.props.isAdmin ? "editable-cell" : "static-cell"}
                tabable={1}
              />
            </EditableCell>
          );
        }
      },
      {
        accessor: "basis_minutes",
        Header: "Grunnlag",
        className: "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { data, value, rowIdx } = this.extractCommonCellProps(cellInfo);
          const deviate = data.get(rowIdx)["basis_invoice_minutes_deviation"];
          const className = deviate ? "cell-warning" : "";
          return (
            <DurationStaticCell
              className={`static-cell ${className}`}
              value={value}
              hours={true}
              decimals={1}
            />
          );
        }
      },
      {
        accessor: "invoice_minutes",
        Header: "Fak. timetall",
        className: this.props.isAdmin
          ? "cell-rt-js cell-rt-js-static" : "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { data, columnId, projectId, value, rowIdx } = this.extractCommonCellProps(
            cellInfo
          );
          const staticCellRef = React.createRef();
          const deviate = data.get(rowIdx)["basis_invoice_minutes_deviation"];
          const className = deviate ? "cell-warning" : "";

          return (
            <EditableCell
              projectId={projectId}
              columnId={columnId}
              onInputChange={this.props.tableData.body.onInputChange}
              onValueChange={this.props.tableData.body.onInvoiceBalanceMinutesChange}
              value={value}
              inputValidator={isValidHours}
              input={data.get(cellInfo.index)["input"][columnId]}
              isAdmin={this.props.isAdmin}
            >
              <DurationStaticCell
                className={this.props.isAdmin ? `editable-cell ${className}` : "static-cell"}
                ref={staticCellRef}
                value={value}
                tabable={1}
              />
            </EditableCell>
          );
        }
      },
      {
        accessor: "expense_money",
        Header: "Utgifter",
        className: this.props.isAdmin
          ? "cell-rt-js cell-rt-js-static" : "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { data, columnId, projectId, value } = this.extractCommonCellProps(cellInfo);
          const staticCellRef = React.createRef();
          return (
            <EditableCell
              projectId={projectId}
              columnId={columnId}
              onInputChange={this.props.tableData.body.onInputChange}
              onValueChange={this.props.tableData.body.onOtherExpenseChange}
              value={value}
              inputValidator={isValidAmount}
              input={data.get(cellInfo.index)["input"][columnId]}
              isAdmin={this.props.isAdmin}
            >
              <MonetaryStaticCell
                ref={staticCellRef}
                value={value}
                className={this.props.isAdmin ? "editable-cell" : "static-cell"}
                tabable={1}
              />
            </EditableCell>
          );
        }
      },
      {
        accessor: "subcontractor_money",
        Header: "UL",
        className: this.props.isAdmin
          ? "cell-rt-js cell-rt-js-static" : "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { data, columnId, projectId, value } = this.extractCommonCellProps(cellInfo);
          const staticCellRef = React.createRef();
          return (
            <EditableCell
              projectId={projectId}
              columnId={columnId}
              onInputChange={this.props.tableData.body.onInputChange}
              onValueChange={this.props.tableData.body.onSubcontractorExpenseChange}
              value={value}
              inputValidator={isValidAmount}
              input={data.get(cellInfo.index)["input"][columnId]}
              isAdmin={this.props.isAdmin}
            >
              <MonetaryStaticCell
                ref={staticCellRef}
                value={value}
                className={this.props.isAdmin ? "editable-cell" : "static-cell"}
                tabable={1}
              />
            </EditableCell>
          );
        }
      },
      {
        accessor: "invoice_money",
        Header: "Honorar",
        className: this.props.isAdmin
          ? "cell-rt-js cell-rt-js-static" : "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { data, columnId, projectId, value, rowIdx } = this.extractCommonCellProps(
            cellInfo
          );
          const staticCellRef = React.createRef();
          return (
            <EditableCell
              projectId={projectId}
              columnId={columnId}
              onInputChange={this.props.tableData.body.onInputChange}
              onValueChange={this.props.tableData.body.onInvoiceBalanceMoneyChange}
              value={value}
              inputValidator={isValidAmount}
              input={data.get(cellInfo.index)["input"][columnId]}
              isAdmin={this.props.isAdmin}
            >
              <MonetaryStaticCell
                ref={staticCellRef}
                value={value}
                className={this.props.isAdmin ? "editable-cell" : "static-cell"}
                tabable={1}
              />
            </EditableCell>
          );
        }
      },
      {
        accessor: "hourly_rate",
        Header: "OT",
        className: "cell-rt-js cell-rt-js-numeric-content",
        Cell: cellInfo => {
          const { value } = this.extractCommonCellProps(cellInfo);
          return <MonetaryStaticCell value={value} />;
        }
      },
      {
        accessor: "status",
        Header: "Fak. Status",
        className: "cell-rt-js cell-rt-js-static",
        Cell: cellInfo => {
          const { data, projectId, rowIdx } = this.extractCommonCellProps(cellInfo);
          return (
            <InvoiceStatusCell
              status={data.get(rowIdx)["status"]}
              onChange={this.props.tableData.body.onStatusChange}
              projectId={projectId}
              isAdmin={this.props.isAdmin}
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

    const heightLock = { height: window.innerHeight - 64 - 77 - 61 };

    return (
      <div className="fade-in">
        <div className="table-header-container">
          <MonthNavigation
            selectedYear={this.props.title.year}
            selectedMonth={this.props.title.month}
            navigation={this.props.title.navigation}
          />
          <MonthAggregates data={this.props.tableData.footer} />
        </div>
        <ReactTable
          style={heightLock}
          data={this.props.tableData.body.list}
          resolveData={data => data.toArray().map(row => row)}
          columns={columns}
          defaultPageSize={this.props.tableData.body.list.size + 4}
          className="-highlight"
          showPaginationBottom={false}
          getTheadThProps={() => {
            return { style: { outline: "none" } };
          }}
        />
      </div>
    );
  }
}

BalanceView.propTypes = {
  tableData: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default BalanceView;
