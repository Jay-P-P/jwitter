import React from 'react';
import '../css/App.css';

const TextArea = props => {
  const {
    cols,
    rows,
    labelName,
    maxlength,
    className,
    placeHolder,
    name,
    value,
    onSubmit
  } = props;

  const shortcutSubmit = e => {
    if (e.ctrlKey) {
      onSubmit(e);
    }
  };

  return (
    <label className="label">
      {labelName}
      <textarea
        cols={cols}
        rows={rows}
        maxLength={maxlength}
        className={`textarea ${className}`}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={e => props.useInput(e)}
        onKeyPressCapture={e => shortcutSubmit(e)}
      />
    </label>
  );
};

export default TextArea;
