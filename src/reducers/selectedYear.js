import { SELECT_YEAR } from '../actions/index';

export default (state = new Date().getFullYear(), action) => {
  if (action.type === SELECT_YEAR && action.payload && action.payload !== null) {
    return parseInt(action.payload);
  }
  return state;
};
