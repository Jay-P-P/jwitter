import React from 'react';
import PropTypes from 'prop-types';
import '../css/App.css';

const InputBar = props => {
  const { labelProps, inputProps, labelName, children } = props;

  return (
    <label {...labelProps} className="label">
      {labelName}
      <input {...inputProps} className={`input ${inputProps.className}`} />
      {children}
    </label>
  );
};

InputBar.propTypes = {
  inputProps: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    ariaLabelledby: PropTypes.string,
    role: PropTypes.string
  }),
  labelProps: PropTypes.shape({
    role: PropTypes.string
  }),
  labelName: PropTypes.string.isRequired
};

export default InputBar;
