import React from 'react';

const Basis = props => {
  const value = props.timeEntry - props.writeOff;
  return <td className='static-data'>{Math.floor(value) === 0 ? '' : value}</td>;
};

Basis.propTypes = {
  timeEntry: React.PropTypes.number.isRequired,
  writeOff: React.PropTypes.number.isRequired,
};

export default Basis;
