import * as Immutable from "immutable";
import { CHANGE_INPUT, GET_HOURS_PER_PROJECT } from "../actions/index";

const roundHalf = num => Math.round(num * 2) / 2;

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_HOURS_PER_PROJECT:
      return {
        loading: false,
        data: action.payload.reduce(
          (result, entry) =>
            result.set(entry.project, {
              write_off_minutes: roundHalf(entry.write_off_minutes / 60).toString(),
              invoice_minutes: roundHalf(entry.invoice_balance_minutes / 60).toString(),
              expense_money: entry.expense_money.toString(),
              subcontractor_money: entry.subcontractor_money.toString(),
              invoice_money: entry.invoice_balance_money.toString()
            }),
          new Immutable.Map()
        )
      };
    case CHANGE_INPUT:
      return {
        loading: false,
        data: state.data.set(action.project, {
          ...state.data.get(action.project),
          [action.key]: action.value
        })
      };
    default:
      return state;
  }
};
