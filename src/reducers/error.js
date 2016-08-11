import { API_ERROR, API_ERROR_CLEAR } from '../actions/index';

export default (state = null, action) => {
  switch (action.type) {
    case API_ERROR:
      return action.payload;
    case API_ERROR_CLEAR:
      return null;
    default:
      return state;
  }
};
