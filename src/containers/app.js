import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects, getHoursPerProject } from '../actions/index';
import titleSelector from '../selectors/titleSelector';
import tableBodySelector from '../selectors/tableBodySelector';
import IndexComponent from '../components/index';

class App extends Component {
  constructor(props) {
    super(props);

    props.getProjects();
    props.getHoursPerProject(props.title.startDate, props.title.endDate);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title.startDate !== this.props.title.startDate ||
        nextProps.title.endDate !== this.props.title.endDate) {
      nextProps.getHoursPerProject(nextProps.title.startDate, nextProps.title.endDate);
    }
  }

  render() {
    if (this.props.tableBody.loading) {
      return null;
    }
    return <IndexComponent tableBody={this.props.tableBody.data} title={this.props.title} />;
  }
}

App.propTypes = {
  // mapStateToProps
  tableBody: React.PropTypes.object.isRequired,
  title: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getProjects: React.PropTypes.func.isRequired,
  getHoursPerProject: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  tableBody: tableBodySelector(state, ownProps),
  title: titleSelector(state, ownProps),
});

const mapDispatchToProps = {
  getProjects,
  getHoursPerProject
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
