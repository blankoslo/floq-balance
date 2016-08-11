import { createSelector } from 'reselect';
import moment from 'moment';
import * as Immutable from 'immutable';

// TODO: Needs heavy testing.
const getWeeks = (week, year, selectedWeekSpan) => {
  let weeks = new Immutable.List();
  const maxWeek = moment().year(year).isoWeeksInYear();
  const start = Math.min(Math.max(week, 1), maxWeek);

  for (let i = start, j = year; weeks.size < selectedWeekSpan; i === maxWeek ? (i = 1, j++) : i++) {
    weeks = weeks.push({ week: i, year: j });
  }
  return weeks;
};

export default createSelector(
  state => state.selected_week,
  state => state.selected_year,
  state => state.selected_week_span,
  getWeeks
);
