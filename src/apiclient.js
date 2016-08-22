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

