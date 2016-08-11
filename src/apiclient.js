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
fetch(`${baseURL}/projects?select=id,name,billable&order=id.desc`, {
  headers
}).then(response => response.json());

export const getEmployees = () =>
  fetch(`${baseURL}/employees?select=id,first_name,last_name&order=first_name.desc`, {
    headers
  }).then(response => response.json());

export const getBalance = () => fetch(`${baseURL}/balance`, {
  headers
}).then(response => response.json());

export const getWorkedDaysPerWeek = body => fetch(`${baseURL}/rpc/worked_days_per_week`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const addBalance = body => fetch(`${baseURL}/rpc/add_days_to_week`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());

export const removeBalance = body => fetch(`${baseURL}/rpc/remove_days_from_week`, {
  method: 'POST',
  headers: dataHeaders,
  body: JSON.stringify(body)
}).then(response => response.json());
