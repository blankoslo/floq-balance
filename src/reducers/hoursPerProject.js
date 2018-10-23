import * as Immutable from "immutable";

import {
  GET_HOURS_PER_PROJECT,
  UPSERT_WRITE_OFF,
  UPSERT_EXPENSE,
  UPSERT_INVOICE_BALANCE,
  UPSERT_INVOICE_STATUS
} from "../actions/index";

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  const entry = state.data.get(action.project);
  switch (action.type) {
    case GET_HOURS_PER_PROJECT:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(e => [e.project, e])).sortBy(e =>
          e.project.toLowerCase()
        )
      };
    case UPSERT_WRITE_OFF:
      return {
        loading: false,
        data: state.data.set(action.project, {
          ...entry,
          write_off_minutes: action.minutes,
          status: entry.status || "not_done"
        })
      };
    case UPSERT_EXPENSE:
      return {
        loading: false,
        data: state.data.set(
          action.project,
          action.expense_type === "subcontractor"
            ? {
                ...entry,
                subcontractor_money: action.money,
                status: entry.status || "not_done"
              }
            : {
                ...entry,
                expense_money: action.money,
                status: entry.status || "not_done"
              }
        )
      };
    case UPSERT_INVOICE_BALANCE:
      return {
        loading: false,
        data: state.data.set(action.project, {
          ...entry,
          invoice_balance_money: action.money,
          invoice_balance_minutes: action.minutes,
          status: entry.status || "not_done"
        })
      };
    case UPSERT_INVOICE_STATUS:
      return {
        loading: false,
        data: state.data.set(action.project, {
          ...entry,
          status: action.status
        })
      };
    default:
      return state;
  }
};
