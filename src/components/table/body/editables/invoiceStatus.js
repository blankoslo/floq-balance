import React from 'react';

const statuses = [
  { value: 'not_done', name: 'Ikke ferdig' },
  { value: 'not_ok', name: 'Ikke godkjent' },
  { value: 'ok', name: 'Godkjent' },
  { value: 'sent', name: 'Sendt' },
];

const BalanceViewInvoiceStatus = props => (
  <td>
    {props.status
      ?
      <select
        defaultValue={props.status}
        onChange={e => props.onChange(props.project, e.target.value)}
      >
        {statuses.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
      </select>
      : ''
    }
  </td>
);

BalanceViewInvoiceStatus.propTypes = {
  status: React.PropTypes.string,
  project: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default BalanceViewInvoiceStatus;
