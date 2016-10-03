import * as Immutable from 'immutable';
import { CHANGE_INPUT, GET_HOURS_PER_PROJECT } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_HOURS_PER_PROJECT:
      return {
        loading: false,
        data: action.payload.reduce((result, entry) =>
          result.set(
            entry.project,
            {
              writeOff: entry.write_off_minutes.toString(),
              billedHours: entry.invoice_balance_minutes.toString(),
              expense: entry.expense_money.toString(),
              subcontractor: entry.subcontractor_money.toString(),
              fee: entry.invoice_balance_money.toString(),
            }
          ), new Immutable.Map())
      };
    case CHANGE_INPUT:
      return {
        loading: false,
        data: state.data.set(
          action.project,
          { ...state.data.get(action.project), [action.key]: action.value }
        )
      };
    default:
      return state;
  }
};
