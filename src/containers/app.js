import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects, getHoursPerProject, upsertInvoiceBalance, upsertWriteOff,
  upsertExpense } from '../actions/index';
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

  onWriteOffChange(projectId, minutes) {
    this.props.upsertWriteOff(projectId, this.props.title.endDate, minutes);
  }

  render() {
    if (this.props.tableBody.loading) {
      return null;
    }
    return (<IndexComponent
      tableBody={this.props.tableBody.data}
      title={this.props.title}
      onWriteOffChange={this.onWriteOffChange}
    />);
  }
}

App.propTypes = {
  // mapStateToProps
  tableBody: React.PropTypes.object.isRequired,
  title: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getProjects: React.PropTypes.func.isRequired,
  getHoursPerProject: React.PropTypes.func.isRequired,
  upsertInvoiceBalance: React.PropTypes.func.isRequired,
  upsertWriteOff: React.PropTypes.func.isRequired,
  upsertExpense: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  tableBody: tableBodySelector(state, ownProps),
  title: titleSelector(state, ownProps),
});

const mapDispatchToProps = {
  getProjects,
  getHoursPerProject,
  upsertInvoiceBalance,
  upsertWriteOff,
  upsertExpense,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
