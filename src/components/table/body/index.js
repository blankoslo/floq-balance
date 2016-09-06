import React from 'react';
import Row from './bodyRow';

const BalanceViewBody = (props) => (
  <tbody>
    {props.data.map(row =>
      <Row
        data={row}
        key={row.projectId}
      />)}
  </tbody>
);

BalanceViewBody.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BalanceViewBody;
