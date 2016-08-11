import * as Immutable from 'immutable';

import { GET_EMPLOYEES } from '../actions/index';

const lowerCaseName = e => `${e.first_name}${e.last_name}`.toLowerCase();

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        loading: false,
        data: new Immutable.OrderedMap(action.payload.map(e => [e.id, e]))
            .sortBy(lowerCaseName)
      };
    default:
      return state;
  }
};
