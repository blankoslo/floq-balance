import { createSelector } from "reselect";
import * as Immutable from "immutable";

const initials = name =>
  name
    .split(" ")
    .map(s => s.charAt(0).toUpperCase())
    .join("");

const filterFields = (projects, hoursPerProject) => {
  if (projects.loading || hoursPerProject.loading) {
    return { data: new Immutable.Map() };
  }
  return {
    uniqueCustomerCodes: projects.data
      .map((value, key) => {
        return value.customer.id;
      })
      .toSet()
      .sort()
      .toJS(),
    uniqueResponsibleInitials: projects.data
      .map((value, key) => {
        const project = projects.data.get(key);
        const name = `${project.responsible.first_name} ${project.responsible.last_name}`;
        return initials(name);
      })
      .toSet()
      .sort()
      .toJS(),
    uniqueStatuses: hoursPerProject.data
      .map((value, key) => {
        return value.status;
      })
      .toSet()
      .sort()
      .toJS()
  };
};

export default createSelector(
  state => state.projects,
  state => state.hours_per_project,
  filterFields
);
