import React from 'react';
import Row from './bodyRow';

const BalanceViewBody = (props) => (
  <tbody>
    {props.data.list.map(row =>
      <Row
        data={row}
        onWriteOffChange={props.data.onWriteOffChange}
        key={row.projectId}
      />)}
  </tbody>
);

BalanceViewBody.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BalanceViewBody;
