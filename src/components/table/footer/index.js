import PropTypes from "prop-types";
import React from "react";
import Decimal from "../body/decimal";

const FooterRow = props => (
  <tfoot>
    <tr className="footer">
      <td>Totalt:</td>
      <Decimal value={props.data.fee} decimals={0} />
      <Decimal value={props.data.net_turnover} decimals={0} />
      <Decimal value={props.data.hourly_rate} />
      <td />
      <td />
      <Decimal value={props.data.time_entry_minutes / 60} />
      <Decimal value={props.data.write_off_minutes / 60} />
      <Decimal value={props.data.basis_minutes / 60} />
      <Decimal value={props.data.invoice_minutes / 60} />
      <Decimal value={props.data.expense} />
      <Decimal value={props.data.subcontractor_expense} />
      <Decimal value={props.data.fee} />
      <Decimal value={props.data.hourly_rate} />
      <td />
    </tr>
  </tfoot>
);

FooterRow.propTypes = {
  data: PropTypes.object.isRequired
};

export default FooterRow;
