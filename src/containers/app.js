import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProjects, getHoursPerProject, upsertInvoiceBalance, upsertWriteOff,
  upsertExpense, upsertInvoiceStatus } from '../actions/index';
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

  onWriteOffChange = (project, minutes) =>
     this.props.upsertWriteOff(project, this.props.title.endDate, minutes);

  onExpenseChange = (project, type, minutes) =>
     this.props.upsertExpense(project, this.props.title.endDate, type, minutes);

  onInvoiceBalanceChange = (project, minutes, money) =>
    this.props.upsertInvoiceBalance(project, this.props.title.endDate, minutes, money);

  onInvoiceStatusChange = (project, status) =>
    this.props.upsertInvoiceStatus(project, this.props.title.endDate, status);

  render() {
    if (this.props.tableBody.loading) {
      return null;
    }
    return (<IndexComponent
      tableBody={{
        list: this.props.tableBody.data,
        onWriteOffChange: this.onWriteOffChange,
        onExpenseChange: this.onExpenseChange,
        onInvoiceBalanceChange: this.onInvoiceBalanceChange,
        onInvoiceStatusChange: this.onInvoiceStatusChange,
      }}
      title={this.props.title}
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
  upsertInvoiceStatus: React.PropTypes.func.isRequired,
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
  upsertInvoiceStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
