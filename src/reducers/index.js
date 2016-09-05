import ErrorReducer from './error';
import ProjectsReducer from './projects';

const rootReducer = {
  error: ErrorReducer,
  projects: ProjectsReducer
};

export default rootReducer;
