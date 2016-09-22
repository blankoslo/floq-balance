import * as Immutable from 'immutable';

import { GET_HOURS_PER_PROJECT, UPSERT_WRITE_OFF } from '../actions/index';

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
          { ...state.data.get(action.project), write_off_hours: Math.round(action.minutes / 60, 1) }
        )
      };
    default:
      return state;
  }
};
