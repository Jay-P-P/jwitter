import React from 'react';

const UserContext = React.createContext({
  user: {},
  updateUser: async name => {}
});

export default UserContext;
