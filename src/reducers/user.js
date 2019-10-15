import { AUTHENTICATE_USER } from "../actions/index";

export default (state = { loading: true, user: undefined }, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        loading: false,
        data: action.payload
      };
    default:
      return state;
  }
};
