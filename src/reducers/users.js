import axios from 'axios';
import uuid from 'uuid';

const usersReducerDefaultState = [];

export default (state = usersReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_USERS':
        axios.get('https://randomuser.me/api/?results=500').then(res => {
            console.log(res);
            let users = res.data.results;
            users.map(user => user.id = uuid())
            console.log(users);
            return [ users ];
        }).catch(e => {
            return state
        })
    default:
      return state;
  }
};
