import React from 'react';
import Row from './bodyRow';

const BalanceViewBody = (props) => (
  <tbody>
    {props.projects.data.toIndexedSeq().map((p) =>
      <Row
        project={p}
        key={p.id}
      />)}
  </tbody>
);

BalanceViewBody.propTypes = {
  projects: React.PropTypes.object
};

export default BalanceViewBody;
