import React from "react";
import Select from "@material-ui/core/Select";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

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

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:hover:not(.MuiInput-disabled-13):not(.MuiInput-focused-12):not(.MuiInput-error-15):before": {
          borderBottom: "none"
        },
        "&.MuiInput-focused-12:after": {
          transform: "scalex(0)"
        },
        "&:before": {
          borderBottom: "none"
        }
      }
    }
  }
});

const styles = {
  root: {
    display: "flex",
    width: "auto",
    minWidth: "100px",
    textAlign: "center",
    fontWeight: 500,
    padding: 2,
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    "&:focus-within": {
      borderWidth: "2px !important",
      backgroundColor: "rgba(102, 0, 255, 0.25)"
    }
  },
  select: {
    paddingRight: 0
  }
};

const BlankSelect = withStyles(styles)(props => {
  const { classes, children, className, isAdmin, ...other } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <Select
        className={className}
        classes={{
          root: classes.root,
          select: classes.select
        }}
        {...other}
      >
        {children}
      </Select>
    </MuiThemeProvider>
  );
});

export const InvoiceStatusCell = ({ status, onChange, projectId, isAdmin }) => {
  const className = status !== null ? "status-cell" : "static-cell";
  const statusColor = statusColorMap.get(status);

  if (isAdmin) {
    return (
      <div className={className}>
        {status !== null ? (
          <BlankSelect
            style={{
              color: statusColor,
              border: `1px solid ${statusColor}`,
              borderRadius: 5
            }}
            value={status}
            onChange={e => onChange(projectId, e.target.value)}
            inputProps={{tabIndex: 1}}
            isAdmin={isAdmin}
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
  } else {
    return (
      <div className={className}>
        {statusLabelMap.get(status)}
      </div>
    );
  }
};
