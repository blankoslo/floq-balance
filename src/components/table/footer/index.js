import PropTypes from "prop-types";
import React from "react";

const monetaryFormatter = amount => {
  const formatter = new Intl.NumberFormat("nb");
  return formatter.format(amount.toFixed(amount % 1 ? 2 : 0));
};

const durationFormatter = minutes => {
  const formatter = new Intl.NumberFormat("nb");
  return formatter.format((minutes / 60).toFixed((minutes / 60) % 1 ? 1 : 0));
};

const ColumnTotal = props => {
  const { value, label, type } = props;
  return (
    <div>
      <div>{props.label}</div>
      <div>{props.value}</div>
    </div>
  );
};

const TotalSummary = props => {
  const { data } = props;
  return (
    <div className={"table-total-summary"}>
      <ColumnTotal label={"Netto omsetning"} value={monetaryFormatter(data.net_turnover)} />
      <ColumnTotal label={"OT Kunde"} value={monetaryFormatter(data.hourly_rate)} />
      <ColumnTotal label={"Timeføring"} value={durationFormatter(data.time_entry_minutes)} />
      <ColumnTotal label={"Avskriving"} value={durationFormatter(data.write_off_minutes)} />
      <ColumnTotal label={"Grunnlag"} value={durationFormatter(data.basis_minutes)} />
      <ColumnTotal label={"Fak. timetall"} value={durationFormatter(data.invoice_minutes)} />
      <ColumnTotal label={"Utgifter"} value={monetaryFormatter(data.expense)} />
      <ColumnTotal label={"UL"} value={monetaryFormatter(data.subcontractor_expense)} />
      <ColumnTotal label={"Honorar"} value={monetaryFormatter(data.fee)} />
    </div>
  );
};

TotalSummary.propTypes = {
  data: PropTypes.object.isRequired
};

export default TotalSummary;
