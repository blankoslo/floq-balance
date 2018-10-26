import React from "react";
import NativeSelect from "@material-ui/core/NativeSelect";

const isValidAmount = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);
const isValidHours = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

export const statusLabelMap = new Map([
  ["not_done", "Ikke ferdig"],
  ["not_ok", "Ikke godkjent"],
  ["ok", "Godkjent"],
  ["sent", "Sendt"],
  [null, "N/A"]
]);

export const InvoiceStatusCell = ({ status, onChange, projectId, className }) => (
  <div className={className ? className : "cell-static"}>
    {status !== null ? (
      <NativeSelect value={status} onChange={e => onChange(projectId, e.target.value)}>
        {Array.from(statusLabelMap).map(([key, value]) => {
          return key === null ? (
            undefined
          ) : (
            <option key={key} value={key}>
              {value}
            </option>
          );
        })}
      </NativeSelect>
    ) : (
      "N/A"
    )}
  </div>
);

export const MonetaryStaticCell = ({ value, className }) => {
  const monataryFormatter = new Intl.NumberFormat("nb");

  return (
    <div className={className ? className : "cell-static"}>
      {monataryFormatter.format(value.toFixed(value % 1 ? 2 : 0))}
    </div>
  );
};

export const TextStaticCell = ({ value }) => {
  return <div>{value}</div>;
};

export const DurationStaticCell = ({ value, decimals, onClick, className }) => {
  const numDecimals = input => (input === undefined || input === null ? 1 : input);
  const durationFormatter = new Intl.NumberFormat("nb");
  return (
    <div onClick={onClick} className={className ? className : "cell-static"}>
      {durationFormatter.format((value / 60).toFixed((value / 60) % 1 ? numDecimals(decimals) : 0))}
    </div>
  );
};

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.inputCell = React.createRef();
    // this.state = {
    //   validInput: null
    // };
  }

  componentDidMount() {
    const node = this.inputCell.current;

    // Set focus for clicked editable cell
    node.focus();

    // Set carrot to beginning
    let range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Add eventlistener to trigger upsert upon ENTER keypress
    node.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        node.blur();
      }
    });

    // node.addEventListener("input", e => {
    //   this.validateInput(e.target.innerHTML);
    // });
  }

  // validateInput = input => {
  //   this.setState({ validInput: Boolean(this.props.inputValidator(input)) });
  // };

  render() {
    const { onBlurEventHandler, input } = this.props;

    // const className =
    //   this.state.validInput === null ? "" : this.state.validInput ? "ce-valid" : "ce-invalid";

    return (
      // {<div className={`content-editable ${className}`}>}
      <div className={"content-editable"}>
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
      </div>
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
      <div onClick={this.setActiveFocus} className={"cell-editable-click-wrapper"}>
        {this.state.hasActiveFocus ? (
          <EditableCell input={this.props.input} onBlurEventHandler={this.onBlurEventHandler} />
        ) : (
          <MonetaryStaticCell value={this.props.value} className={"cell-editable"} />
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
      <div onClick={this.setActiveFocus} className={"cell-editable-click-wrapper"}>
        {this.state.hasActiveFocus ? (
          <EditableCell input={this.props.input} onBlurEventHandler={this.onBlurEventHandler} />
        ) : (
          <DurationStaticCell value={this.props.value} hours={true} className={"cell-editable"} />
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
      <div onClick={this.setActiveFocus} className={"cell-editable-click-wrapper"}>
        {this.state.hasActiveFocus ? (
          <EditableCell
            input={this.props.input}
            onBlurEventHandler={this.onBlurEventHandler}
            inputValidator={isValidAmount}
          />
        ) : (
          <MonetaryStaticCell value={this.props.value} className={"cell-editable"} />
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
      <div onClick={this.setActiveFocus} className={"cell-editable-click-wrapper"}>
        {this.state.hasActiveFocus ? (
          <EditableCell input={this.props.input} onBlurEventHandler={this.onBlurEventHandler} />
        ) : (
          <DurationStaticCell value={this.props.value} hours={true} className={"cell-editable"} />
        )}
      </div>
    );
  }
}
