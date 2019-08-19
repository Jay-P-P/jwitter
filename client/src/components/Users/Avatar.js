import React from 'react';
import '../../css/Avatar.css';

const Avatar = props => {
  const { height, width, url, className } = props;
  return (
    <img
      width={width}
      height={height}
      src={url}
      className={`Avatar-Img ${className}`}
      alt="User avatar"
    />
  );
};

export default Avatar;
