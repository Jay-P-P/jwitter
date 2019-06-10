import React from 'react';
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
        onChange={e => props.useInput(e)}
      />
      {children}
    </label>
  );
};

export default InputBar;
