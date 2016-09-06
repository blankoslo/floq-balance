import * as Immutable from 'immutable';

import { GET_HOURS_PER_PROJECT } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_HOURS_PER_PROJECT:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(e => [e.project, e]))
            .sortBy(e => e.project.toLowerCase())
      };
    default:
      return state;
  }
};
