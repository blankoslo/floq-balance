import * as Immutable from 'immutable';

import { GET_HOURS_PER_PROJECT, UPSERT_WRITE_OFF, UPSERT_EXPENSE,
  UPSERT_INVOICE_BALANCE } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_HOURS_PER_PROJECT:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(e => [e.project, e]))
            .sortBy(e => e.project.toLowerCase())
      };
    case UPSERT_WRITE_OFF:
      return {
        loading: false,
        data: state.data.set(
          action.project,
          { ...state.data.get(action.project), write_off_minutes: action.minutes }
        )
      };
    case UPSERT_EXPENSE:
      return {
        loading: false,
        data: state.data.set(
          action.project,
          action.expense_type === 'subcontractor'
          ? { ...state.data.get(action.project), subcontractor_money: action.money }
          : { ...state.data.get(action.project), expense_money: action.money }
        )
      };
    case UPSERT_INVOICE_BALANCE:
      return {
        loading: false,
        data: state.data.set(
          action.project,
          {
            ...state.data.get(action.project),
            invoice_balance_money: action.money,
            invoice_balance_minutes: action.minutes
          }
        )
      };
    default:
      return state;
  }
};
