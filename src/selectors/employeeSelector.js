import { createSelector } from 'reselect';

const getEmployee = (selectedEmployee, employees) => {
  if (employees.loading) {
    return { loading: true, data: null };
  }

  if (selectedEmployee === null) {
    return {
      loading: true,
      data: null
    };
  }

  const employee = employees.data.find(e => e.id === parseInt(selectedEmployee));

  if (employee === null) {
    return {
      loading: true,
      data: null
    };
  }

  return {
    loading: false,
    data: {
      id: employee.id,
      name: `${employee.first_name} ${employee.last_name}`
    }
  };
};

export default createSelector(
  state => state.selected_employee,
  state => state.employees,
  getEmployee,
);
