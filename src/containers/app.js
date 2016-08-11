import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getProjects, getStaffing,
  selectYear, selectWeek, selectWeekSpan } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    // props.getProjects();

    // props.selectYear(props.location.query.year);
    // props.selectWeek(props.location.query.week);
    // props.selectWeekSpan(props.location.query.week_span);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.location.query.year !== this.props.location.query.year) {
  //     this.props.selectYear(nextProps.location.query.year);
  //   }
  //   if (nextProps.location.query.week !== this.props.location.query.week) {
  //     this.props.selectWeek(nextProps.location.query.week);
  //   }
  // }

  render() {
    // if (this.props.projects.loading) {
    //   return null;
    // }
    // const children = React.Children.map(this.props.children,
    //   child => React.cloneElement(child, {
    //     projects: this.props.projects,
    //     balance: this.props.balance,
    //     selectedYear: this.props.selectedYear,
    //     selectedWeek: this.props.selectedWeek,
    //     selectedWeekSpan: this.props.selectedWeekSpan
    //   }));

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,

  // mapStateToProps
  // employees: React.PropTypes.object.isRequired,
  // projects: React.PropTypes.object.isRequired,
  // balance: React.PropTypes.object.isRequired,
  // selectedYear: React.PropTypes.number.isRequired,
  // selectedWeek: React.PropTypes.number.isRequired,
  // selectedWeekSpan: React.PropTypes.number.isRequired,

  // mapDispatchToProps
  // getEmployees: React.PropTypes.func.isRequired,
  // getProjects: React.PropTypes.func.isRequired,
  // getBalance: React.PropTypes.func.isRequired,
  // selectYear: React.PropTypes.func.isRequired,
  // selectWeek: React.PropTypes.func.isRequired,
  // selectWeekSpan: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  projects: state.projects,
  staffing: state.staffing,
  selectedYear: state.selected_year,
  selectedWeek: state.selected_week,
  selectedWeekSpan: state.selected_week_span,
});

const mapDispatchToProps = {
  getEmployees,
  getProjects,
  getStaffing,
  selectYear,
  selectWeek,
  selectWeekSpan
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
