import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import UserCard from './UserCard';
import InputBar from '../InputBar';
import LoadingCircle from '../LoadingCircle';
import { CSSTransition } from 'react-transition-group';
import '../../css/App.css';
import '../../css/UsersList.css';

const UsersList = props => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [usersLoaded, setUsersLoaded] = useState(false);
  let context = useContext(UserContext);

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      let users = await axios.get('/api/users/');
      if (isMounted) {
        await setUsers(users.data.users);
        setUsersLoaded(true);
      }
    };
    getUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="UsersList-Container">
        <InputBar
          inputProps={{
            type: 'text',
            name: 'search',
            value: searchTerm,
            placeholder: 'Search for a user',
            className: 'UsersList-SearchBar',
            role: 'searchbox',
            onChange: e => setSearchTerm(e.target.value)
          }}
          labelName="Search User"
        />
        <CSSTransition
          in={!usersLoaded}
          timeout={500}
          classNames="Loading"
          unmountOnExit
        >
          <LoadingCircle />
        </CSSTransition>
        <div className="UsersList">
          {users
            ? users
                .filter(
                  user =>
                    context.user.name !== user.name &&
                    user.name.includes(searchTerm)
                )
                .map(user => <UserCard key={user._id} user={user} />)
            : ''}
        </div>
      </div>
    </>
  );
};

export default UsersList;
