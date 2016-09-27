import React from 'react';

const Basis = props => {
  const value = props.timeEntry - props.writeOff;
  return <td className='static-data'>{Math.abs(value) < 0.01 ? '' : value}</td>;
};

Basis.propTypes = {
  timeEntry: React.PropTypes.number.isRequired,
  writeOff: React.PropTypes.number.isRequired,
};

export default Basis;
