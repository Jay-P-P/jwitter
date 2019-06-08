import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import config from '../../config/RequestHeaders';
import UserCard from './UserCard';
import '../../css/App.css';
import '../../css/UserHome.css';

const UsersList = props => {
  const [usersList, setUsersList] = useState([]);
  let context = useContext(UserContext);
  const { users } = usersList;

  useEffect(() => {
    const getUsers = async () => {
      let users = await axios.get('/api/users/', config);
      await setUsersList({ ...users.data });
    };
    getUsers();
  }, []);

  return (
    <div className="container UserHome-Grid">
      {users
        ? users
            .filter(user => user.name !== context.user.name)
            .map(user => <UserCard key={user._id} paramName={user.name} />)
        : ''}
    </div>
  );
};

export default UsersList;
