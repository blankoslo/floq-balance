import * as api from '../apiclient';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_HOURS_PER_PROJECT = 'GET_HOURS_PER_PROJECT';

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
    { in_start_date: startDate,
      in_end_date: endDate
    }
  )
});
