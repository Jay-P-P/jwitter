import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import UserCard from './UserCard';
import '../../css/App.css';
import '../../css/UsersList.css';

const UsersList = props => {
  const [usersList, setUsersList] = useState([]);
  let context = useContext(UserContext);
  const { users } = usersList;

  useEffect(() => {
    const getUsers = async () => {
      let users = await axios.get('/api/users/');
      await setUsersList({ ...users.data });
    };
    getUsers();
    return () => {};
  }, []);

  return (
    <div className="container UsersList">
      {users
        ? users
            .filter(user => user.name !== context.user.name)
            .map(user => <UserCard key={user._id} paramName={user.name} />)
        : ''}
    </div>
  );
};

export default UsersList;
