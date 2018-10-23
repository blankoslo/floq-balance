import { apiError } from "../actions/index";

const isPromise = val => val && typeof val.then === "function";

export default store => next => action =>
  isPromise(action.payload)
    ? action.payload.then(
        result => store.dispatch({ ...action, payload: result }),
        error => {
          store.dispatch(apiError(`${error.data.message}: ${error.data.details}`));

          return Promise.reject(error);
        }
      )
    : next(action);
