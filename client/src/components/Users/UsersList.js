import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import UserCard from './UserCard';
import InputBar from '../InputBar';
import '../../css/App.css';
import '../../css/UsersList.css';

const UsersList = props => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  let context = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      let users = await axios.get('/api/users/');
      if (isMounted) {
        await setUsers(users.data.users);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="UsersList-Container">
      <InputBar
        type="text"
        name="search"
        labelName="Search User"
        className="UsersList-SearchBar"
        placeHolder="Search for a user."
        value={searchTerm}
        onChangeHandler={e => setSearchTerm(e.target.value)}
      />
      <div className="UsersList">
        {users
          ? users
              .filter(
                user =>
                  context.user.name !== user.name &&
                  user.name.includes(searchTerm)
              )
              .map(user => <UserCard key={user._id} paramName={user.name} />)
          : ''}
      </div>
    </div>
  );
};

export default UsersList;
