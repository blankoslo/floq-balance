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

  onWriteOffChange = (project, hours) =>
    this.props.upsertWriteOff(project, this.props.title.endDate, hours * 60);

  onOtherExpenseChange = (project, money) =>
    this.props.upsertExpense(project, this.props.title.endDate, "other", money);

  onSubcontractorExpenseChange = (project, money) =>
    this.props.upsertExpense(project, this.props.title.endDate, "subcontractor", money);

  onInvoiceBalanceMinutesChange = (project, hours) => {
    const money = this.props.tableBody.data.find(row => row.projectId === project)["invoice_money"];
    this.props.upsertInvoiceBalance(project, this.props.title.endDate, hours * 60, money);
  };

  onInvoiceBalanceMoneyChange = (project, money) => {
    const minutes = this.props.tableBody.data.find(row => row.projectId === project)[
      "invoice_minutes"
    ];
    this.props.upsertInvoiceBalance(project, this.props.title.endDate, minutes, money);
  };

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
    // this.props.tableBody.data.map(x => console.log(x));
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
            onOtherExpenseChange: this.onOtherExpenseChange,
            onSubcontractorExpenseChange: this.onSubcontractorExpenseChange,
            onInvoiceBalanceMinutesChange: this.onInvoiceBalanceMinutesChange,
            onInvoiceBalanceMoneyChange: this.onInvoiceBalanceMoneyChange,
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
  onOtherExpenseChange: PropTypes.func.isRequired,
  onSubcontractorExpenseChange: PropTypes.func.isRequired,
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
