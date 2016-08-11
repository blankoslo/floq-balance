import { SELECT_WEEK_SPAN } from '../actions/index';

export default (state = 8, action) => {
  if (action.type === SELECT_WEEK_SPAN && action.payload && action.payload !== null) {
    return parseInt(action.payload);
  }
  return state;
};
