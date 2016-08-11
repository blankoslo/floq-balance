import { combineReducers } from 'redux';

import ErrorReducer from './error';
import ProjectsReducer from './projects';

const rootReducer = combineReducers({
  error: ErrorReducer,
  projects: ProjectsReducer,
});

export default rootReducer;
