import 'whatwg-fetch';

const baseURL =
  typeof window !== 'undefined' && window.config && window.config.apiUri
    ? window.config.apiUri : 'https://api-dev.floq.no';

const apiToken =
  typeof window !== 'undefined' && window.apiToken
    ? window.apiToken : 'dev-secret-shhh';

const headers = {
  Authorization: `Bearer ${apiToken}`,
  Prefer: 'return=representation', // ask for the updated entity after modifications (e.g. PATCH)
  Accept: 'application/json'
};

const dataHeaders = Object.assign({}, headers, {
  'Content-Type': 'application/json; charset=utf-8'
});

export const getProjects = () =>
  fetch(`${baseURL}/projects?select=id,name,billable,customer{id,name}`
  + '&billable=eq.billable&order=id.desc', {
    headers
  }).then(response => response.json());

export const getHoursPerProject = body => fetch(`${baseURL}/rpc/hours_per_project`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const upsertInvoiceBalance = body => fetch(`${baseURL}/rpc/upsert_invoice_balance`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const upsertWriteOff = body => fetch(`${baseURL}/rpc/upsert_write_off`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const upsertExpense = body => fetch(`${baseURL}/rpc/upsert_expense`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());
