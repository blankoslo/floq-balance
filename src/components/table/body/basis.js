import React from 'react';

const Basis = props => (
  <td>
    {
      props.timeEntry - props.writeOff
    }
  </td>
);

Basis.propTypes = {
  timeEntry: React.PropTypes.number.isRequired,
  writeOff: React.PropTypes.number.isRequired,
};

export default Basis;
