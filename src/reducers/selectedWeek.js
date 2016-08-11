import { SELECT_WEEK } from '../actions/index';
import moment from 'moment';

export default (state = moment().startOf('isoweek').isoWeek(), action) => {
  if (action.type === SELECT_WEEK && action.payload && action.payload !== null) {
    return parseInt(action.payload);
  }
  return state;
};
