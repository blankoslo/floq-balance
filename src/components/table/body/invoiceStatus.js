import React from 'react';

const statuses = [
  { value: 'not_done', name: 'Ikke ferdig' },
  { value: 'not_ok', name: 'Ikke godkjent' },
  { value: 'ok', name: 'Godkjent' },
  { value: 'sent', name: 'Sendt' },
];

const BalanceViewInvoiceStatus = props => (
  <td>
    {props.invoiceStatus
      ?
      <select defaultValue={props.invoiceStatus}>
        {statuses.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
      </select>
      : ''
    }
  </td>
);

BalanceViewInvoiceStatus.propTypes = {
  invoiceStatus: React.PropTypes.string,
};

export default BalanceViewInvoiceStatus;
