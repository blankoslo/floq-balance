import React from "react";
import BalanceViewTitle from "./title";
// import BalanceViewTable from './table';
import ReactTable from "react-table";
import "react-table/react-table.css";

// const EditableCell =

const BalanceView = props => {
  // { value: 'Kunde', title: 'Kundekode' },
  // { value: 'Brutto omsetning kunde', title: 'Brutto omsetning kunde' },
  // { value: 'Netto omsetning kunde', title: 'Netto omsetning kunde' },
  // { value: 'OT Kunde', title: 'Oppnådd timespris Kunde' },
  // { value: 'Engasjement', title: 'Engasjement' },
  // { value: 'Ansv.', title: 'Ansvarlig' },
  // { value: 'Timeføring', title: 'Timeføring' },
  // { value: 'Avskrivning', title: 'Avskrivning' },
  // { value: 'Grunnlag', title: 'Grunnlag' },
  // { value: 'Fak. timetall', title: 'Fakturert timetall' },
  // { value: 'Utgifter', title: 'Utgifter' },
  // { value: 'UL', title: 'Underleverandører' },
  // { value: 'Honorar', title: 'Honorar' },
  // { value: 'OT', title: 'Oppnådd timepris' },
  // { value: 'Fak. Status', title: 'Fakturastatus' },

  const add = (a, b) => a + b;

  const columns = [
    { accessor: "customerCode", Header: "Kunde", Footer: <strong>TOTAL:</strong> },
    { accessor: "gross_turnover_customer", Header: "Brutto omsetning kunde" },
    {
      accessor: "net_turnover_customer",
      Header: "Netto omsetning kunde",
      Footer: <strong>{props.tableData.footer.net_turnover}</strong>
    },
    {
      accessor: "hourly_rate_customer",
      Header: "OT Kunde",
      Footer: <strong>{props.tableData.footer.hourly_rate}</strong>
    },
    { accessor: "projectId", Header: "Engasjement" },
    // { accessor: 'responsible', Header: 'Ansvarlig' },
    {
      accessor: "time_entry_minutes",
      Header: "Timeføring",
      Footer: <strong>{props.tableData.footer.time_entry_minutes}</strong>
    },
    {
      accessor: "write_off_minutes",
      Header: "Avskrivning",
      Footer: <strong>{props.tableData.footer.write_off_minutes}</strong>
    },
    {
      accessor: "basis_minutes",
      Header: "Grunnlag",
      Footer: <strong>{props.tableData.footer.basis_minutes}</strong>
    },
    {
      accessor: "invoice_minutes",
      Header: "Fak. timetall",
      Footer: <strong>{props.tableData.footer.invoice_minutes}</strong>
    },
    {
      accessor: "expense_money",
      Header: "Utgifter",
      Footer: <strong>{props.tableData.footer.expense}</strong>
    },
    {
      accessor: "subcontractor_money",
      Header: "UL",
      Footer: <strong>{props.tableData.footer.subcontractor_expense}</strong>
    },
    {
      accessor: "invoice_money",
      Header: "Honorar",
      Footer: <strong>{props.tableData.footer.fee}</strong>
    },
    { accessor: "hourly_rate", Header: "OT" },
    { accessor: "status", Header: "Fak. Status" }
    // { accessor: 'input', Header: 'input' },
  ];

  console.log(props);
  return (
    <div>
      <BalanceViewTitle
        selectedYear={props.title.selectedYear}
        selectedMonth={props.title.month}
        navigation={props.title.navigation}
      />
      <ReactTable
        data={props.tableData.body.list}
        columns={columns}
        defaultPageSize={100}
        className="-striped -highlight"
      />
    </div>
  );
};

BalanceView.propTypes = {
  tableData: React.PropTypes.object.isRequired,
  title: React.PropTypes.object.isRequired,
};

export default BalanceView;
