import React from 'react';
import '../css/App.css';

const InputBar = props => {
  return (
    <label className="label">
      {props.labelName}
      <input
        type={props.inputType}
        className={`input ${props.className}`}
        placeholder={props.placeHolder}
        name={props.name}
        value={props.input}
        onChange={e => props.useInput(e)}
      />
      {props.children}
    </label>
  );
};

export default InputBar;
