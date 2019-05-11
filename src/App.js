import React from 'react';
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";

import { setData, toggleLoading } from './actions/users';
import './App.css';
import List from './components/List';
import Menu from './components/Menu';



export class App extends React.Component {

  componentDidMount(){
    Auth.signIn('admin@example.com', "Zxcvbnm0!");
  }

  render() {
    return (
      <div className="App">
        {this.props.isPageLoading && <div className="loading"><div className="lds-hourglass"></div></div>}
        <Menu />
        <List />
      </div>
  );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setData: (users) => dispatch(setData(users)),
  toggleLoading: (isPageLoading) => dispatch(toggleLoading(isPageLoading))
});

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

