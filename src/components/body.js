import React from 'react';
import Row from './bodyRow';

const BalanceViewBody = () => (
  <tbody>
    {Array(12).fill(1).map((e, index) =>
      <Row
        key={index}
      />)}
  </tbody>
);

BalanceViewBody.propTypes = {
};

export default BalanceViewBody;
