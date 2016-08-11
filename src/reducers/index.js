import { combineReducers } from 'redux';

import ErrorReducer from './error';
import EmployeesReducer from './employees';
import ProjectsReducer from './projects';
import BalanceReducer from './balance';
import WorkedDaysPerWeekReducer from './workedDaysPerWeek';
import SelectedEmployeeReducer from './selectedEmployee';
import SelectedYearReducer from './selectedYear';
import SelectedWeekReducer from './selectedWeek';
import SelectedWeekSpanReducer from './selectedWeekSpan';

const rootReducer = combineReducers({
  error: ErrorReducer,
  employees: EmployeesReducer,
  projects: ProjectsReducer,
  balance: BalanceReducer,
  worked_days_per_week: WorkedDaysPerWeekReducer,
  selected_employee: SelectedEmployeeReducer,
  selected_year: SelectedYearReducer,
  selected_week: SelectedWeekReducer,
  selected_week_span: SelectedWeekSpanReducer
});

export default rootReducer;
