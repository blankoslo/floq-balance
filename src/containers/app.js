import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProjects,
  getHoursPerProject,
  upsertInvoiceBalance,
  upsertWriteOff,
  upsertExpense,
  upsertStatus,
  changeInput
} from "../actions/index";
import { initateTimeTrackingReportDownload } from "../apiclient";
import titleSelector from "../selectors/titleSelector";
import tableBodySelector from "../selectors/tableBodySelector";
import footerSelector from "../selectors/footerSelector";
import filterFieldsSelector from "../selectors/filterFieldsSelector";
import IndexComponent from "../components/index";

class App extends Component {
  constructor(props) {
    super(props);

    props.getProjects();
    props.getHoursPerProject(props.title.startDate, props.title.endDate);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.title.startDate !== this.props.title.startDate ||
      nextProps.title.endDate !== this.props.title.endDate
    ) {
      nextProps.getHoursPerProject(nextProps.title.startDate, nextProps.title.endDate);
    }
  }

  onWriteOffChange = (project, minutes) =>
    this.props.upsertWriteOff(project, this.props.title.endDate, minutes);

  onExpenseChange = (project, type, minutes) =>
    this.props.upsertExpense(project, this.props.title.endDate, type, minutes);

  onInvoiceBalanceChange = (project, minutes, money) =>
    this.props.upsertInvoiceBalance(project, this.props.title.endDate, minutes, money);

  onStatusChange = (project, status) =>
    this.props.upsertStatus(project, this.props.title.endDate, status);

  onInputChange = (project, key, value) => this.props.changeInput(project, key, value);

  getMonthlyTimeTrackingReport = projectId => {
    initateTimeTrackingReportDownload(
      projectId,
      this.props.title.startDate,
      this.props.title.endDate
    );
  };

  render() {
    if (this.props.tableBody.loading) {
      return null;
    }
    return (
      <IndexComponent
        tableData={{
          body: {
            list: this.props.tableBody.data,
            filterFieldValues: this.props.filterFieldValues,
            onWriteOffChange: this.onWriteOffChange,
            onExpenseChange: this.onExpenseChange,
            onInvoiceBalanceChange: this.onInvoiceBalanceChange,
            onStatusChange: this.onStatusChange,
            onInputChange: this.onInputChange,
            getMonthlyTimeTrackingReport: this.getMonthlyTimeTrackingReport
          },
          footer: this.props.footer.data
        }}
        title={this.props.title}
      />
    );
  }
}

App.propTypes = {
  // mapStateToProps
  tableBody: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,

  // mapDispatchToProps
  getProjects: PropTypes.func.isRequired,
  getHoursPerProject: PropTypes.func.isRequired,
  upsertInvoiceBalance: PropTypes.func.isRequired,
  upsertWriteOff: PropTypes.func.isRequired,
  upsertExpense: PropTypes.func.isRequired,
  upsertStatus: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  tableBody: tableBodySelector(state, ownProps),
  title: titleSelector(state, ownProps),
  footer: footerSelector(state, ownProps),
  filterFieldValues: filterFieldsSelector(state, ownProps)
});

const mapDispatchToProps = {
  getProjects,
  getHoursPerProject,
  upsertInvoiceBalance,
  upsertWriteOff,
  upsertExpense,
  upsertStatus,
  changeInput
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
