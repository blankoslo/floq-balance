import React from 'react';

const Basis = props => {
  const value = ((props.timeEntryMinutes - props.writeOffMinutes) / 60).toFixed(1);
  return <td className='static-data'>{Math.abs(value) < 0.01 ? '' : value}</td>;
};

Basis.propTypes = {
  timeEntryMinutes: React.PropTypes.number.isRequired,
  writeOffMinutes: React.PropTypes.number.isRequired,
};

export default Basis;
