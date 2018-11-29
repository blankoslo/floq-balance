import React from "react";

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

export const TextStaticCell = ({ value }) => {
  return <div>{value}</div>;
};
