import React from "react";
import NativeSelect from "@material-ui/core/NativeSelect";

const isValidAmount = input => input.match(/^((\d|[1-9]\d+)(\.\d{1,2})?|\.\d{1,2})$/);
const isValidHours = input => input.match(/^((\d|[1-9]\d+)(\.5)?|\.5)$/);

const isValidDecimalKey = keyCode =>
  (keyCode >= 48 && keyCode <= 57) || keyCode === 44 ? true : false;
const isSubmitKey = keyCode => (keyCode === 13 ? true : false);
const isTabKey = keyCode => (keyCode === 9 ? true : false);

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
      <NativeSelect
        value={status}
        onChange={e => onChange(projectId, e.target.value)}
        inputProps={{ tabIndex: 1 }}
      >
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

export const MonetaryStaticCell = ({ value, className, tabable }) => {
  const monataryFormatter = new Intl.NumberFormat("nb");

  return (
    <div className={className ? className : "cell-static"} tabIndex={tabable ? 1 : -1}>
      {monataryFormatter.format(value.toFixed(value % 1 ? 2 : 0))}
    </div>
  );
};

export const TextStaticCell = ({ value }) => {
  return <div>{value}</div>;
};

export class DurationStaticCell extends React.Component {
  render() {
    const { value, decimals, onClick, className, tabable } = this.props;
    const numDecimals = input => (input === undefined || input === null ? 1 : input);
    const durationFormatter = new Intl.NumberFormat("nb");
    return (
      <div
        onClick={onClick}
        className={className ? className : "cell-static"}
        tabIndex={tabable ? 1 : -1}
      >
        {durationFormatter.format(
          (value / 60).toFixed((value / 60) % 1 ? numDecimals(decimals) : 0)
        )}
      </div>
    );
  }
}

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.cellWrapper = React.createRef();
    this.inputCell = React.createRef();
    this.state = {
      validInput: null
    };
  }

  componentDidMount() {
    const node = this.inputCell.current;

    // Set focus for clicked editable cell
    node.focus();

    // Set carrot to beginning
    let range = document.createRange();
    range.selectNodeContents(node);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    node.addEventListener("keydown", e => {
      console.log(e.keyCode);
      if (isTabKey(e.keyCode)) {
        e.preventDefault();
      }

      if (e.keyCode === 27) {
        this.props.onBlurEventHandler(this.props.value.toString());
      }
    });

    node.addEventListener("input", e => {
      const newValue =
        e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML.replace(",", ".");
      this.validateInput(newValue);
      e.preventDefault();
    });
  }

  handleOnBlur = e => {
    const newValue = e.target.innerHTML.trim() === "" ? "0" : e.target.innerHTML.replace(",", ".");
    if (!Boolean(this.props.inputValidator(newValue))) {
      e.target.focus();
      return;
    }
    this.props.onBlurEventHandler(newValue);
  };

  validateInput = input => {
    this.setState({ validInput: Boolean(this.props.inputValidator(input)) });
  };

  render() {
    const className =
      this.state.validInput === null ? "" : this.state.validInput ? "ce-valid" : "ce-invalid";

    return (
      // {<div className={`content-editable ${className}`}>}
      <div
        className={`content-editable ${className}`}
        onKeyPressCapture={e => {
          if (!isValidDecimalKey(e.charCode)) {
            e.stopPropagation();
            e.preventDefault();
          }

          if (isSubmitKey(e.charCode)) {
            // e.stopPropagation();
            // e.preventDefault();
            this.inputCell.current.blur();
          }
        }}
      >
        <div
          style={{ flexGrow: "1", outline: "none", display: "flex", justifyContent: "flex-end" }}
          ref={this.inputCell}
          contentEditable
          suppressContentEditableWarning
          onBlur={this.handleOnBlur}
          dangerouslySetInnerHTML={{
            __html: String(this.props.input).replace(".", ",")
          }}
        />
      </div>
    );
  }
}

export class FeeCell extends React.Component {
  constructor(props) {
    super(props);
    this.cellWrapper = React.createRef();
    this.state = {
      hasActiveFocus: false
    };
  }

  componentDidMount() {
    const node = this.cellWrapper.current;
    node.addEventListener("keydown", e => {
      if (isSubmitKey(e.keyCode)) {
        if (document.activeElement !== node.children[0]) {
          node.blur();
        } else {
          this.setActiveFocus();
          e.preventDefault();
        }
      }
    });
  }

  onBlurEventHandler = inputValue => {
    this.props.onInputChange(this.props.projectId, this.props.columnId, inputValue);
    this.setState({ hasActiveFocus: false });
    if (inputValue === this.props.value.toString()) return;
    if (!isValidAmount(inputValue)) return;
    this.props.onValueChange(this.props.projectId, this.props.billedMinutes, Number(inputValue));
  };

  setActiveFocus = () => {
    this.setState({ hasActiveFocus: true });
  };

  render() {
    return (
      <div
        onDoubleClick={this.setActiveFocus}
        className={"cell-click-wrapper"}
        ref={this.cellWrapper}
      >
        {this.state.hasActiveFocus ? (
          <EditableCell
            onBlurEventHandler={this.onBlurEventHandler}
            inputValidator={isValidAmount}
            value={this.props.value}
            input={this.props.input}
          />
        ) : (
          <MonetaryStaticCell value={this.props.value} className={"cell-editable"} tabable={1} />
        )}
      </div>
    );
  }
}

export class BilledHoursCell extends React.Component {
  constructor(props) {
    super(props);
    this.cellWrapper = React.createRef();
    this.state = {
      hasActiveFocus: false
    };
  }

  componentDidMount() {
    const node = this.cellWrapper.current;
    node.addEventListener("keydown", e => {
      if (isSubmitKey(e.keyCode)) {
        if (document.activeElement !== node.children[0]) {
          node.blur();
        } else {
          this.setActiveFocus();
          e.preventDefault();
        }
      }
    });
  }

  onBlurEventHandler = inputValue => {
    this.props.onInputChange(this.props.projectId, this.props.columnId, inputValue);
    this.setState({ hasActiveFocus: false });
    if (inputValue === this.props.value.toString()) return;
    if (!isValidHours(inputValue)) return;
    this.props.onValueChange(this.props.projectId, Number(inputValue) * 60, this.props.fee);
  };

  setActiveFocus = () => {
    this.setState({ hasActiveFocus: true });
  };

  render() {
    return (
      <div
        onDoubleClick={this.setActiveFocus}
        className={"cell-click-wrapper"}
        ref={this.cellWrapper}
      >
        {this.state.hasActiveFocus ? (
          <EditableCell
            onBlurEventHandler={this.onBlurEventHandler}
            inputValidator={isValidHours}
            value={this.props.value}
            input={this.props.input}
          />
        ) : (
          <DurationStaticCell
            value={this.props.value}
            hours={true}
            className={"cell-editable"}
            tabable={1}
          />
        )}
      </div>
    );
  }
}
export class ExpenseCell extends React.Component {
  constructor(props) {
    super(props);
    this.cellWrapper = React.createRef();
    this.state = {
      hasActiveFocus: false
    };
  }

  onBlurEventHandler = inputValue => {
    this.props.onInputChange(this.props.projectId, this.props.columnId, inputValue);
    this.setState({ hasActiveFocus: false });
    if (inputValue === this.props.value.toString()) return;
    if (!isValidAmount(inputValue)) return;
    this.props.onValueChange(this.props.projectId, this.props.type, Number(inputValue));
  };

  setActiveFocus = () => {
    this.setState({ hasActiveFocus: true });
  };

  render() {
    return (
      <div
        onDoubleClick={this.setActiveFocus}
        className={"cell-click-wrapper"}
        ref={this.cellWrapper}
        onKeyPressCapture={e => {
          if (isSubmitKey(e.charCode)) {
            this.setActiveFocus();
            e.preventDefault();
          }
        }}
      >
        {this.state.hasActiveFocus ? (
          <EditableCell
            onBlurEventHandler={this.onBlurEventHandler}
            inputValidator={isValidAmount}
            value={this.props.value}
            input={this.props.input}
          />
        ) : (
          <MonetaryStaticCell value={this.props.value} className={"cell-editable"} tabable={1} />
        )}
      </div>
    );
  }
}
export class WriteOffCell extends React.Component {
  constructor(props) {
    super(props);
    this.cellWrapper = React.createRef();
    this.cellStatic = React.createRef();
    this.state = {
      staticCellFocus: false
    };
  }

  onBlurEventHandler = inputValue => {
    this.props.onInputChange(this.props.projectId, this.props.columnId, inputValue);
    this.setState({ hasActiveFocus: false });
    if (this.props.value.toString() === inputValue) return;
    if (!isValidHours(inputValue)) return;
    this.props.onValueChange(this.props.projectId, Number(inputValue) * 60);
  };

  setActiveFocus = () => {
    this.setState({ hasActiveFocus: true });
  };

  render() {
    return (
      <div
        onDoubleClick={this.setActiveFocus}
        className={"cell-click-wrapper"}
        ref={this.cellWrapper}
        onKeyPressCapture={e => {
          if (isSubmitKey(e.charCode)) {
            this.setActiveFocus();
            e.preventDefault();
          }
        }}
      >
        {this.state.hasActiveFocus ? (
          <EditableCell
            onBlurEventHandler={this.onBlurEventHandler}
            inputValidator={isValidHours}
            value={this.props.value}
            input={this.props.input}
          />
        ) : (
          <DurationStaticCell
            ref={this.cellStatic}
            value={this.props.value}
            hours={true}
            className={"cell-editable"}
            tabable={1}
          />
        )}
      </div>
    );
  }
}
