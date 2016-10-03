import ErrorReducer from './error';
import ProjectsReducer from './projects';
import HoursPerHourReducer from './hoursPerProject';
import InputReducer from './input';

const rootReducer = {
  error: ErrorReducer,
  projects: ProjectsReducer,
  hours_per_project: HoursPerHourReducer,
  input: InputReducer,
};

export default rootReducer;
