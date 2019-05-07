import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import uuid from 'uuid';

import { getUsers } from './actions/users';
import displayUsers from './selectors/users';
import './App.css';



export class App extends React.Component {
  state = {
    users: [],
    sortedUsersByAge: [],
    sortedUsersByLongitude: [],
    averageAge: undefined,
    oldest:undefined,
    youngest:undefined,
    northenMost:undefined,
    southernMost:undefined
  }

  componentDidMount(){

  }

  getUsersData = () => {
    axios.get('https://randomuser.me/api/?results=500').then(res => {
      console.log(res);
      let users = res.data.results;
      users.map(user => user.id = uuid())
      console.log(users);

      let sortedUsersByAge = JSON.parse(JSON.stringify(users))
      console.log(sortedUsersByAge)
      sortedUsersByAge.sort((a,b) => new Date(a.dob.date).getTime() - new Date(b.dob.date).getTime())

      let sortedUsersByLongitude = JSON.parse(JSON.stringify(users))
      console.log(sortedUsersByLongitude)
      sortedUsersByLongitude.sort((a,b) => a.location.coordinates.longitude - b.location.coordinates.longitude)
      this.setState({users: users, sortedUsersByAge: sortedUsersByAge, sortedUsersByLongitude: sortedUsersByLongitude})
    }).catch(e => {
        console.log(e)
    })
  }

  findAverageAge = (users) => {
    let age = 0;
    users.map(user => {
      age += user.dob.age;
    })
    return age/users.length.toFixed(1)
  }

  
  calculate = () =>{
    this.setState({
      averageAge: this.findAverageAge(this.state.users),
      oldest: this.state.sortedUsersByAge[0],
      youngest: this.state.sortedUsersByAge[this.state.users.length -1],
      northenMost: this.state.sortedUsersByLongitude[0],
      southernMost: this.state.sortedUsersByLongitude[this.state.users.length-1]
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <div className="App-body">
        <button onClick={this.getUsersData}>Get Users</button>
        <button onClick={this.calculate}>Display details</button>
        <div>
          <p>averageAge: {this.state.averageAge ? this.state.averageAge : 'no data yet'}</p>
          <p>Oldest: {this.state.oldest ? this.state.oldest.email : 'no data yet'}</p>
          <p>Youngest: {this.state.youngest ? this.state.youngest.email : 'no data yet'}</p>
          <p>Northen Most: {this.state.northenMost ? this.state.northenMost.email : 'no data yet'}</p>
          <p>Southern Most: {this.state.southernMost ? this.state.southernMost.email : 'no data yet'}</p>
        </div>
        {
          this.state.users.length > 0 ? this.state.users.map((user) => (
            <div key={user.id}>{user.email}</div>
          )) : <p>No Users</p>
        }
        </div>
      </div>
  );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers())
});

const mapStateToProps = (state) => {
  return {
    users: displayUsers(state.users)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

