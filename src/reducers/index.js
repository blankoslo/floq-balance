import ErrorReducer from './error';
import ProjectsReducer from './projects';
import HoursPerHourReducer from './hoursPerProject.js';

const rootReducer = {
  error: ErrorReducer,
  projects: ProjectsReducer,
  hours_per_project: HoursPerHourReducer,
};

export default rootReducer;
