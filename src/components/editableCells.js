import React from "react";
import NativeSelect from "@material-ui/core/NativeSelect";

const isValidAmount = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);
const isValidHours = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

const statuses = [
  { value: "not_done", name: "Ikke ferdig" },
  { value: "not_ok", name: "Ikke godkjent" },
  { value: "ok", name: "Godkjent" },
  { value: "sent", name: "Sendt" }
];

export const InvoiceStatusCell = ({ status, onChange, projectId }) => (
  <div>
    {status ? (
      <NativeSelect value={status} onChange={e => onChange(projectId, e.target.value)}>
        {statuses.map((option, key) => (
          <option key={key} value={option.value}>
            {option.name}
          </option>
        ))}
      </NativeSelect>
    ) : (
      ""
    )}
  </div>
);

export const MonetaryStaticCell = ({ value }) => {
  // const monataryFormatter = new Intl.NumberFormat("nb", {
  //   style: "currency",
  //   currency: "NOK",
  //   minimumFractionDigits: 2
  // });

  const monataryFormatter = new Intl.NumberFormat("nb");

  return <div>{monataryFormatter.format(value.toFixed(value % 1 ? 2 : 0))}</div>;
};

export const TextStaticCell = ({ value }) => {
  return <div>{value}</div>;
};

export const DurationStaticCell = ({ value, hours, decimals, onClick, className }) => {
  const numDecimals = input => (input === undefined || input === null ? 1 : input);
  return (
    <div onClick={onClick} className={className}>
      {hours ? (value / 60).toFixed((value / 60) % 1 ? numDecimals(decimals) : 0) : value}
    </div>
  );
};

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.inputCell = React.createRef();
  }

  componentDidMount() {
    const node = this.inputCell.current;
    node.focus();
    let range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  render() {
    const { onBlurEventHandler, input } = this.props;
    return (
      <div
        style={{ flexGrow: "1", outline: "none", display: "flex", justifyContent: "flex-end" }}
        ref={this.inputCell}
        contentEditable
        suppressContentEditableWarning
        onBlur={onBlurEventHandler}
        dangerouslySetInnerHTML={{
          __html: input
        }}
      />
    );
  }
}

export class FeeCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasActiveFocus: false
    };
  }

  onBlurEventHandler = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML;
    this.props.onInputChange(this.props.projectId, this.props.columnId, newValue);
    this.setState({ hasActiveFocus: false });
    if (newValue === this.props.value.toString()) return;
    if (!isValidAmount(newValue)) return;
    this.props.onValueChange(this.props.projectId, this.props.billedMinutes, Number(newValue));
  };

  setActiveFocus = () => {
    this.setState({ hasActiveFocus: true });
  };

  render() {
    return (
      <div onClick={this.setActiveFocus}>
        {this.state.hasActiveFocus ? (
          <EditableCell input={this.props.input} onBlurEventHandler={this.onBlurEventHandler} />
        ) : (
          <MonetaryStaticCell value={this.props.value} />
        )}
      </div>
    );
  }
}

export class BilledHoursCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasActiveFocus: false
    };
  }
  onBlurEventHandler = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML;
    this.props.onInputChange(this.props.projectId, this.props.columnId, newValue);
    this.setState({ hasActiveFocus: false });
    if (newValue === this.props.value.toString()) return;
    if (!isValidHours(newValue)) return;
    this.props.onValueChange(this.props.projectId, Number(newValue) * 60, this.props.fee);
  };

  setActiveFocus = () => {
    this.setState({ hasActiveFocus: true });
  };

  render() {
    return (
      <div onClick={this.setActiveFocus}>
        {this.state.hasActiveFocus ? (
          <EditableCell input={this.props.input} onBlurEventHandler={this.onBlurEventHandler} />
        ) : (
          <DurationStaticCell value={this.props.value} hours={true} />
        )}
      </div>
    );
  }
}
export class ExpenseCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasActiveFocus: false
    };
  }
  onBlurEventHandler = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML;
    this.props.onInputChange(this.props.projectId, this.props.columnId, newValue);
    this.setState({ hasActiveFocus: false });
    if (newValue === this.props.value.toString()) return;
    if (!isValidAmount(newValue)) return;
    this.props.onValueChange(this.props.projectId, this.props.type, Number(newValue));
  };

  setActiveFocus = () => {
    this.setState({ hasActiveFocus: true });
  };

  render() {
    return (
      <div onClick={this.setActiveFocus}>
        {this.state.hasActiveFocus ? (
          <EditableCell input={this.props.input} onBlurEventHandler={this.onBlurEventHandler} />
        ) : (
          <MonetaryStaticCell value={this.props.value} />
        )}
      </div>
    );
  }
}

export class WriteOffCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasActiveFocus: false
    };
  }

  onBlurEventHandler = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML;
    this.props.onInputChange(this.props.projectId, this.props.columnId, newValue);
    this.setState({ hasActiveFocus: false });
    if (this.props.value.toString() === newValue) return;
    if (!isValidHours(newValue)) return;
    this.props.onValueChange(this.props.projectId, Number(newValue) * 60);
  };

  setActiveFocus = () => {
    this.setState({ hasActiveFocus: true });
  };

  render() {
    return (
      <div onClick={this.setActiveFocus}>
        {this.state.hasActiveFocus ? (
          <EditableCell input={this.props.input} onBlurEventHandler={this.onBlurEventHandler} />
        ) : (
          <DurationStaticCell value={this.props.value} hours={true} />
        )}
      </div>
    );
  }
}
