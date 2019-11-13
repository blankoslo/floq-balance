import { GET_LOGGED_IN_EMPLOYEE} from "../actions/index";

export default (state = { loading: true, isAdmin: undefined }, action) => {
  switch (action.type) {
    case GET_LOGGED_IN_EMPLOYEE:
      const isAdmin = action.payload.roles.includes("admin");
      return {
        loading: false,
        isAdmin
      };
    default:
      return state;
  }
};
