import React from 'react';

const statuses = [
  { value: 'unfinished', name: 'Ikke ferdig' },
  { value: 'for_approval', name: 'Ikke godkjent' },
  { value: 'ok', name: 'Godkjent' },
  { value: 'sent', name: 'Sendt' },
];

const BalanceViewInvoiceStatus = () => (
  <td>
    <select>
      {statuses.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
    </select>
  </td>
);

BalanceViewInvoiceStatus.propTypes = {
};

export default BalanceViewInvoiceStatus;
