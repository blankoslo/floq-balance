import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects, getHoursPerProject } from '../actions/index';
import periodSelector from '../selectors/periodSelector';
import IndexComponent from '../components/index';

class App extends Component {
  constructor(props) {
    super(props);

    props.getProjects();
    props.getHoursPerProject(props.startDate, props.endDate);
  }

  render() {
    if (this.props.projects.loading) {
      return null;
    }

    return (
      <IndexComponent projects={this.props.projects} />
    );
  }
}

App.propTypes = {
  // mapStateToProps
  projects: React.PropTypes.object.isRequired,
  startDate: React.PropTypes.string.isRequired,
  endDate: React.PropTypes.string.isRequired,

  // mapDispatchToProps
  getProjects: React.PropTypes.func.isRequired,
  getHoursPerProject: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,

  startDate: periodSelector(state, ownProps).startDate,
  endDate: periodSelector(state, ownProps).endDate,
});

const mapDispatchToProps = {
  getProjects,
  getHoursPerProject
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
