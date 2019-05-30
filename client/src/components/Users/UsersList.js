import React, { useState, useEffect } from 'react';
import axios from 'axios';

import config from '../../config/RequestHeaders';
import User from './User';

const UsersList = props => {
  const [usersList, setUsersList] = useState([]);

  const { users } = usersList;

  useEffect(() => {
    const getUsers = async () => {
      let users = await axios.get('/api/users/', config);
      await setUsersList({ ...users.data });
    };
    getUsers();
  }, []);

  return (
    <div className="container">
      {users
        ? users.map(user => <User key={user._id} paramName={user.name} />)
        : ''}
    </div>
  );
};

export default UsersList;
