const baseURL =
  typeof window !== "undefined" && window.config && window.config.apiUri
    ? window.config.apiUri
    : "https://api-dev.floq.no";

const apiToken =
  typeof window !== "undefined" && window.apiToken ? window.apiToken : "dev-secret-shhh";

const headers = {
  Authorization: `Bearer ${apiToken}`,
  Prefer: "return=representation", // ask for the updated entity after modifications (e.g. PATCH)
  Accept: "application/json"
};

const dataHeaders = Object.assign({}, headers, {
  "Content-Type": "application/json; charset=utf-8"
});

export const getProjects = () =>
  fetch(
    `${baseURL}/projects` +
      "?select=id,name,billable,responsible{id,first_name,last_name},active,customer{id,name}" +
      "&billable=eq.billable&order=id.desc",
    {
      headers
    }
  ).then(response => response.json());

export const getHoursPerProject = body =>
  fetch(`${baseURL}/rpc/hours_per_project`, {
    method: "POST",
    headers: dataHeaders,
    body: JSON.stringify(body)
  }).then(response => response.json());

export const upsertInvoiceBalance = body =>
  fetch(`${baseURL}/rpc/upsert_invoice_balance`, {
    method: "POST",
    headers: dataHeaders,
    body: JSON.stringify(body)
  }).then(response => response.json());

export const upsertWriteOff = body =>
  fetch(`${baseURL}/rpc/upsert_write_off`, {
    method: "POST",
    headers: dataHeaders,
    body: JSON.stringify(body)
  }).then(response => response.json());

export const upsertExpense = body =>
  fetch(`${baseURL}/rpc/upsert_expense`, {
    method: "POST",
    headers: dataHeaders,
    body: JSON.stringify(body)
  }).then(response => response.json());

export const upsertInvoiceStatus = body =>
  fetch(`${baseURL}/rpc/upsert_invoice_status`, {
    method: "POST",
    headers: dataHeaders,
    body: JSON.stringify(body)
  }).then(response => response.json());

export const lockEmployeeHours = body =>
  fetch(`${baseURL}/rpc/lock_employee_hours`, {
    method: "POST",
    headers: dataHeaders,
    body: JSON.stringify(body)
  });

export const authenticateUser = email =>
  fetch(`${baseURL}/employees?select=id,first_name,last_name&email=ilike.${email}`, {
    method: "GET",
    headers: dataHeaders
  })
    .then(response => response.json())
    .then(response => {
      if (response.length === 1) {
        return response[0];
      }
      return response;
    });

/* API routine for initating monthly timetracking report download  */

const reportingHeaders = {
  Authorization: `Bearer ${apiToken}`
};

export const initateTimeTrackingReportDownload = (projectId, startDate, endDate) => {
  fetch(`${baseURL}/reporting/hours/${projectId}?start_date=${startDate}&end_date=${endDate}`, {
    method: "GET",
    headers: reportingHeaders
  })
    .then(response => response.arrayBuffer())
    .then(text =>
      imitateFileDownload(text, `timeføring__${projectId}__${startDate}-${endDate}`, "csv")
    );
};

const imitateFileDownload = (data, filename, type) => {
  var file = new Blob([data]);
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = filename + "." + type;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
};

export const getLoggedInEmployee = () =>
  fetch(`${baseURL}/rpc/employees_roles`, {
    method: "POST",
    body: `{ "email_param": "${window.userEmail}" }`,
    headers: dataHeaders
  })
    .then(response => response.json())
    .then(employees => employees[0]);
