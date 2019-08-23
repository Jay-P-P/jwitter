import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';

const InputBar = props => {
  const {
    inputType,
    labelName,
    className,
    placeHolder,
    name,
    value,
    children
  } = props;

  return (
    <label className="label">
      {labelName}
      <input
        type={inputType}
        className={`input ${className}`}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={e => props.onChangeHandler(e)}
      />
      {children}
    </label>
  );
};

InputBar.propTypes = {
  type: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeHolder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired
};

export default InputBar;
