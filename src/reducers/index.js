import ErrorReducer from "./error";
import ProjectsReducer from "./projects";
import HoursPerHourReducer from "./hoursPerProject";
import InputReducer from "./input";
import UserReducer from "./user";

const rootReducer = {
  error: ErrorReducer,
  projects: ProjectsReducer,
  hours_per_project: HoursPerHourReducer,
  input: InputReducer,
  user: UserReducer
};

export default rootReducer;
