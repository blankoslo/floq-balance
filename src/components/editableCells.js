import React from "react";
import Select from "@material-ui/core/Select";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const isValidDecimalKey = keyCode => (keyCode >= 48 && keyCode <= 57) || keyCode === 44;
const isSubmitKey = keyCode => keyCode === 13;
const isTabKey = keyCode => keyCode === 9;
const isEscKey = keyCode => keyCode === 27;

export const statusLabelMap = new Map([
  ["not_done", "Uferdig"],
  ["not_ok", "Ikke GK"],
  ["ok", "Godkjent"],
  ["sent", "Sendt"],
  [null, "N/A"]
]);

const statusColorMap = new Map([
  ["not_done", "rgb(125, 125, 125)"],
  ["not_ok", "rgb(254, 56, 110)"],
  ["ok", "#12EB81"],
  ["sent", "rgb(102, 0, 255)"]
]);

const styles = {
  root: {
    display: "flex",
    border: "1px solid black",
    backgroundColor: "none",
    width: 125,
    textAlign: "center",
    fontWeight: 500,
    borderRadius: 5,
    padding: 2,
    flexDirection: "row-reverse"
  }
};

const BlankSelect = withStyles(styles)(props => {
  const { classes, children, className, ...other } = props;
  return (
    <Select className={classNames(classes.root, className)} {...other}>
      {children}
    </Select>
  );
});

export const InvoiceStatusCell = ({ status, onChange, projectId }) => {
  const className = status !== null ? "status-cell" : "static-cell";
  const statusColor = statusColorMap.get(status);
  return (
    <div className={className}>
      {status !== null ? (
        <BlankSelect
          style={{ color: statusColor, borderColor: statusColor }}
          value={status}
          onChange={e => onChange(projectId, e.target.value)}
          inputProps={{ tabIndex: 1 }}
        >
          {Array.from(statusLabelMap).map(([key, value]) => {
            return key === null ? (
              undefined
            ) : (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            );
          })}
        </BlankSelect>
      ) : (
        "N/A"
      )}
    </div>
  );
};

export const MonetaryStaticCell = React.forwardRef((props, ref) => {
  const { value, className, tabable } = props;
  const monataryFormatter = new Intl.NumberFormat("nb");
  const tabIndex = tabable ? 1 : -1;

  return (
    <div ref={ref} className={className ? className : "static-cell"} tabIndex={tabIndex}>
      {monataryFormatter.format(value.toFixed(value % 1 ? 2 : 0))}
    </div>
  );
});

export const TextStaticCell = ({ value }) => {
  return <div>{value}</div>;
};

export const DurationStaticCell = React.forwardRef((props, ref) => {
  const { value, decimals, onClick, className, tabable } = props;
  const numDecimals = input => (input === undefined || input === null ? 1 : input);
  const durationFormatter = new Intl.NumberFormat("nb");
  const tabIndex = tabable ? 1 : -1;
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={className ? className : "static-cell"}
      tabIndex={tabIndex}
    >
      {durationFormatter.format((value / 60).toFixed((value / 60) % 1 ? numDecimals(decimals) : 0))}
    </div>
  );
});

class InputCell extends React.Component {
  constructor(props) {
    super(props);
    this.inputCell = React.createRef();
    this.state = {
      validInput: null
    };
  }

  componentDidMount() {
    const node = this.inputCell.current;

    // Set focus for clicked editable cell
    node.focus();

    // Select cell content
    let range = document.createRange();
    range.selectNodeContents(node);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  formatInnerHTML = innerHTML => {
    return innerHTML.trim() === "" ? "0" : innerHTML.replace(",", ".");
  };

  onCellInput = e => {
    const newValue = this.formatInnerHTML(e.target.innerHTML);
    this.setState({ validInput: Boolean(this.props.inputValidator(newValue)) });
    e.preventDefault();
  };

  onCellBlur = e => {
    const newValue = this.formatInnerHTML(e.target.innerHTML);
    if (!Boolean(this.props.inputValidator(newValue))) {
      e.target.focus();
      return;
    }

    // Commit changes
    this.props.onInputChange(this.props.projectId, this.props.columnId, newValue);
    if (this.props.value.toString() === newValue) return;
    this.props.onValueChange(this.props.projectId, Number(newValue));
    this.props.toggleInputCell();
  };

  onKeyPressCapture = e => {
    if (!isValidDecimalKey(e.charCode)) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (isSubmitKey(e.charCode)) {
      this.inputCell.current.blur();
    }
  };

  onKeyDown = e => {
    if (isTabKey(e.keyCode)) {
      e.preventDefault();
    }

    if (isEscKey(e.keyCode)) {
      this.props.onBlurEventHandler(this.props.input.toString());
    }
  };

  render() {
    const className =
      this.state.validInput === null
        ? ""
        : this.state.validInput
          ? "input-cell-valid"
          : "input-cell-invalid";

    return (
      <div
        className={`input-cell-wrapper ${className}`}
        onKeyPressCapture={this.onKeyPressCapture}
        onKeyDown={this.onKeyDown}
      >
        <div
          class={"input-cell"}
          ref={this.inputCell}
          contentEditable
          suppressContentEditableWarning
          onInput={this.onCellInput}
          onBlur={this.onCellBlur}
          dangerouslySetInnerHTML={{
            __html: String(this.props.input).replace(".", ",")
          }}
        />
      </div>
    );
  }
}

export class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderInputCell: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.renderInputCell && !this.state.renderInputCell) {
      this.props.children.ref.current.focus();
    }
  }

  toggleInputCell = () => {
    this.setState({ renderInputCell: this.state.renderInputCell ? false : true });
  };

  render() {
    const className = this.state.renderInputCell
      ? "editable-cell-wrapper-input"
      : "editable-cell-wrapper-static";

    return (
      <div
        onClick={() => this.props.children.ref.current.focus()}
        onDoubleClick={this.toggleInputCell}
        className={`editable-cell-wrapper ${className}`}
        onKeyPressCapture={e => {
          if (isSubmitKey(e.charCode)) {
            this.toggleInputCell();
            e.preventDefault();
          }
        }}
      >
        {this.state.renderInputCell ? (
          <InputCell
            toggleInputCell={this.toggleInputCell}
            inputValidator={this.props.inputValidator}
            onInputChange={this.props.onInputChange}
            onValueChange={this.props.onValueChange}
            projectId={this.props.projectId}
            columnId={this.props.columnId}
            value={this.props.value}
            input={this.props.input}
          />
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}
