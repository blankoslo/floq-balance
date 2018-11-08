import * as Immutable from "immutable";

import { GET_PROJECTS } from "../actions/index";

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(p => [p.id, p])).sortBy(p =>
          p.id.toLowerCase()
        )
      };
    default:
      return state;
  }
};
