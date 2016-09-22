import React from 'react';

const Basis = props => (
  <td>
    {
      props.timeEntry - props.writeOff
    }
  </td>
);

Basis.propTypes = {
  timeEntry: React.PropTypes.string.isRequired,
  writeOff: React.PropTypes.string.isRequired,
};

export default Basis;
