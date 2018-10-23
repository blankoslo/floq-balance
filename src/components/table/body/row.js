import PropTypes from "prop-types";
import React from "react";

import WriteOff from "./editables/writeOff";
import Expense from "./editables/expense";
import Fee from "./editables/fee";
import BilledHours from "./editables/billedHours";
import InvoiceStatus from "./editables/invoiceStatus";

import Decimal from "./decimal";

const BalanceViewBodyRow = props => (
  <tr>
    <td className="uneditable">{props.data.customerCode}</td>
    <Decimal value={props.data.gross_turnover_customer} decimals={0} />
    <Decimal value={props.data.net_turnover_customer} decimals={0} />
    <Decimal value={props.data.hourly_rate_customer} />
    <td className="uneditable">{props.data.projectId}</td>
    <td className="uneditable" title={props.data.responsible.name}>
      {props.data.responsible.initials}
    </td>
    <Decimal value={props.data.time_entry_minutes / 60} />
    <WriteOff
      value={props.data.write_off_minutes}
      input={props.data.input.writeOff}
      onInputChange={props.onInputChange}
      onValueChange={props.onWriteOffChange}
      project={props.data.projectId}
    />
    <Decimal value={props.data.basis_minutes / 60} />
    <BilledHours
      value={props.data.invoice_minutes}
      input={props.data.input.billedHours}
      onInputChange={props.onInputChange}
      onValueChange={props.onInvoiceBalanceChange}
      fee={props.data.invoice_money}
      project={props.data.projectId}
    />
    <Expense
      value={props.data.expense_money}
      input={props.data.input.expense}
      onInputChange={props.onInputChange}
      onValueChange={props.onExpenseChange}
      project={props.data.projectId}
      type={"other"}
    />
    <Expense
      value={props.data.subcontractor_money}
      input={props.data.input.subcontractor}
      onInputChange={props.onInputChange}
      onValueChange={props.onExpenseChange}
      project={props.data.projectId}
      type={"subcontractor"}
    />
    <Fee
      value={props.data.invoice_money}
      input={props.data.input.fee}
      onInputChange={props.onInputChange}
      onValueChange={props.onInvoiceBalanceChange}
      billedMinutes={props.data.invoice_minutes}
      project={props.data.projectId}
    />
    <Decimal value={props.data.hourly_rate} />
    <InvoiceStatus
      status={props.data.status}
      onChange={props.onStatusChange}
      project={props.data.projectId}
    />
  </tr>
);

BalanceViewBodyRow.propTypes = {
  data: PropTypes.object.isRequired,
  onWriteOffChange: PropTypes.func.isRequired,
  onExpenseChange: PropTypes.func.isRequired,
  onInvoiceBalanceChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default BalanceViewBodyRow;
