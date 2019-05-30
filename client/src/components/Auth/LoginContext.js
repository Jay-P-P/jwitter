import React from 'react';

const LoginContext = React.createContext({
  isLoggedIn: false,
  loginUser: () => {}
});

export default LoginContext;
