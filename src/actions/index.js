import * as api from '../apiclient';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_BALANCE = 'GET_BALANCE';
export const GET_WORKED_DAYS_PER_WEEK = 'GET_WORKED_DAYS_PER_WEEK';
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE';
export const SELECT_YEAR = 'SELECT_YEAR';
export const SELECT_WEEK = 'SELECT_WEEK';
export const SELECT_WEEK_SPAN = 'SELECT_WEEK_SPAN';
export const ADD_BALANCE = 'ADD_BALANCE';
export const REMOVE_BALANCE = 'REMOVE_BALANCE';

export const apiError = (message) => ({
  type: API_ERROR,
  payload: message
});

export const clearApiError = () => ({
  type: API_ERROR_CLEAR
});

export const getEmployees = () => ({
  type: GET_EMPLOYEES,
  payload: api.getEmployees()
});

export const getProjects = () => ({
  type: GET_PROJECTS,
  payload: api.getProjects()
});

export const getBalance = () => ({
  type: GET_BALANCE,
  payload: api.getBalance()
});

export const getWorkedDaysPerWeek = (year, week, weekSpan) => ({
  type: GET_WORKED_DAYS_PER_WEEK,
  payload: api.getWorkedDaysPerWeek(
    { in_year: year, in_week: week, in_number_of_weeks: weekSpan }
  )
});

export const selectEmployee = (id) => ({
  type: SELECT_EMPLOYEE,
  payload: id
});

export const selectYear = (year) => ({
  type: SELECT_YEAR,
  payload: year
});

export const selectWeek = (week) => ({
  type: SELECT_WEEK,
  payload: week
});

export const selectWeekSpan = (weekSpan) => ({
  type: SELECT_WEEK_SPAN,
  payload: weekSpan
});

export const addBalance = (data) => ({
  type: ADD_BALANCE,
  payload: api.addBalance(data),
  employee: data.in_employee,
  project: data.in_project
});

export const removeBalance = (data) => ({
  type: REMOVE_BALANCE,
  payload: api.removeBalance(data),
  employee: data.in_employee,
  project: data.in_project
});
