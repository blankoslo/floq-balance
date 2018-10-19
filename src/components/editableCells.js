import React from "react";

const isValidAmount = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);
const isValidHours = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

export class FeeCell extends React.Component {
  constructor(props) {
    super(props);
  }

  onBlurEventHandler = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML;
    this.props.onInputChange(this.props.projectId, this.props.columnId, newValue);
    if (newValue === this.props.value.toString()) return;
    if (!isValidAmount(newValue)) return;
    this.props.onValueChange(this.props.projectId, this.props.billedMinutes, Number(newValue));
  };

  render() {
    return (
      <div
        style={{ backgroundColor: "#fafafa", flexGrow: "1" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={this.onBlurEventHandler}
        dangerouslySetInnerHTML={{
          __html: this.props.input
        }}
      />
    );
  }
}

export class BilledHoursCell extends React.Component {
  constructor(props) {
    super(props);
  }
  onBlurEventHandler = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML;
    this.props.onInputChange(this.props.projectId, this.props.columnId, newValue);
    if (newValue === this.props.value.toString()) return;
    if (!isValidHours(newValue)) return;
    this.props.onValueChange(this.props.projectId, Number(newValue) * 60, this.props.fee);
  };
  render() {
    return (
      <div
        style={{ backgroundColor: "#fafafa", flexGrow: "1" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={this.onBlurEventHandler}
        dangerouslySetInnerHTML={{
          __html: this.props.input
        }}
      />
    );
  }
}
export class ExpenseCell extends React.Component {
  constructor(props) {
    super(props);
  }
  onBlurEventHandler = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML;
    this.props.onInputChange(this.props.projectId, this.props.columnId, newValue);
    if (newValue === this.props.value.toString()) return;
    if (!isValidAmount(newValue)) return;
    this.props.onValueChange(this.props.projectId, this.props.type, Number(newValue));
  };
  render() {
    return (
      <div
        style={{ backgroundColor: "#fafafa", flexGrow: "1" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={this.onBlurEventHandler}
        dangerouslySetInnerHTML={{
          __html: this.props.input
        }}
      />
    );
  }
}
export class WriteOffCell extends React.Component {
  constructor(props) {
    super(props);
  }

  onBlurEventHandler = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML;
    this.props.onInputChange(this.props.project, this.props.columnId, newValue);
    if (this.props.value.toString() === newValue) return;
    if (!isValidHours(newValue)) return;
    this.props.onValueChange(this.props.project, Number(newValue) * 60);
  };

  render() {
    return (
      <div
        style={{ backgroundColor: "#fafafa", flexGrow: "1" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={this.onBlurEventHandler}
        dangerouslySetInnerHTML={{
          __html: this.props.input
        }}
      />
    );
  }
}
