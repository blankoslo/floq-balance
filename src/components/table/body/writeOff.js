import React from 'react';

const isFloat = (n) => Number(n) === n && n % 1 !== 0;

const onChange = (func, project, oldVal) =>
  e => {
    const hours = e.target.value;
    if (!hours || isNaN(hours) || isFloat(hours * 2) || hours < 0 || hours === oldVal) return;
    const minutes = hours * 60;
    func(project, minutes);
  };

const WriteOffCell = props => (
  <td>
    {
      <input
        type='text'
        defaultValue={Math.floor(props.value) === 0 ? '' : props.value}
        onChange={onChange(props.onChange, props.project, props.value)}
      />
    }
  </td>
);

WriteOffCell.propTypes = {
  value: React.PropTypes.string.isRequired,
  project: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default WriteOffCell;
