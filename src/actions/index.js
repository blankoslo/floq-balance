import * as api from '../apiclient';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_HOURS_PER_PROJECT = 'GET_HOURS_PER_PROJECT';
export const UPSERT_INVOICE_BALANCE = 'UPSERT_INVOICE_BALANCE';
export const UPSERT_WRITE_OFF = 'UPSERT_WRITE_OFF';
export const UPSERT_EXPENSE = 'UPSERT_EXPENSE';

export const apiError = (message) => ({
  type: API_ERROR,
  payload: message
});

export const clearApiError = () => ({
  type: API_ERROR_CLEAR
});

export const getProjects = () => ({
  type: GET_PROJECTS,
  payload: api.getProjects()
});

export const getHoursPerProject = (startDate, endDate) => ({
  type: GET_HOURS_PER_PROJECT,
  payload: api.getHoursPerProject(
    { in_start_date: startDate, in_end_date: endDate }
  )
});

export const upsertInvoiceBalance = (project, date, minutes = null, money = null) => ({
  type: UPSERT_INVOICE_BALANCE,
  payload: api.upsertInvoiceBalance(
    { project, date, minutes, money }
  )
});

export const upsertWriteOff = (project, date, minutes) => ({
  type: UPSERT_WRITE_OFF,
  payload: api.upsertWriteOff(
    { project, date, minutes }
  )
});

export const upsertExpense = (project, date, type, money) => ({
  type: UPSERT_EXPENSE,
  payload: api.upsertExpense(
    { project, date, type, money }
  )
});
