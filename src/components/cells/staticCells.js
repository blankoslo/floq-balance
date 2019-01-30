import React from "react";
import classNames from "classnames";

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
      <i className="material-icons" />
    </div>
  );
});

const Tooltip = ({ text }) => {
  return (
    <div className="tooltip">
      <div className="tooltip_tail" />
      <div className="tooltip_buble">{text}</div>
    </div>
  );
};

export class TextStaticCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  handleMouseOver = e => {
    this.setState({ hover: true });
  };

  handleMouseOut = e => {
    this.setState({ hover: false });
  };

  render() {
    const { hoverText, value } = this.props;
    const className = classNames("text-cell", { "tooltip-cell": hoverText !== undefined });
    return (
      <div
        className={className}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {value}
        {this.state.hover && hoverText && <Tooltip text={hoverText} />}
      </div>
    );
  }
}
