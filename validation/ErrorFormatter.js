module.exports = errorFormatter = ({
  location,
  msg,
  param,
  value,
  nestedErrors
}) => {
  return `${msg}`;
};
