import React from 'react';
import Cell from './bodyCell';

const BalanceViewBodyRow = props => (
  <tr>
    <Cell
      value={props.data.customerCode.toString()}
    />
    <Cell
      value={props.data.projectId}
    />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={'JAJ'} />
    <Cell value={props.data.hours.toString()} />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={''} />
    <Cell value={''} />
  </tr>
);

BalanceViewBodyRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BalanceViewBodyRow;
