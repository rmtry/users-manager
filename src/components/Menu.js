import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { API } from "aws-amplify";

import { setData, toggleLoading } from './../actions/users';

class Menu extends React.Component {

    getUsersData = () => {
        this.props.toggleLoading('true')
        axios.get('https://randomuser.me/api/?results=500').then(res => {
            let users = res.data.results;
            users.map(user => user.id = uuid())
          
          
            this.props.setData(users)
        }).catch(e => {
            alert(e.toString())
            this.props.toggleLoading('false')
        })
    }
    
    pushToDb = () => {
        this.props.toggleLoading('true')
        let count =0;
        let success = 0;
        this.props.users.map((data) => {
            API.post( "notes", "/users", {
                body: data
            }).then(() => {
                count++
                success++
                if(count===this.props.users.length){
                this.props.toggleLoading('false');
                alert(success + '/' + count + ' added!')
                }
            }).catch(e => {
                count++
                if(count===this.props.users.length){
                    this.props.toggleLoading('false');
                    alert(success + '/' + count + ' added!')
                }
            });
            return '';
        })
    }
    
    getUsersDataDb = () => {
        this.props.toggleLoading('true');
        let newUsers = [];
        API.get("notes", "/users").then((res) => {
            if(res[0].length > 0){
                res[0].map(data => {
                    newUsers.push(this.toUser(data))
                    return '';
                })
            } 
            this.props.setData(newUsers)
        }).catch(e => {
            alert(e.toString())
            this.props.toggleLoading('false');
        });
    }
    
    toUser = (user) =>{
        return {
            id: user.id,
            name: {
                first: user.firstName,
                last: user.lastName,
            },
            dob: {
                age: user.age,
                date: user.dob
            },
            email: user.email,
            picture: {
                large: user.imgUrl
            },
            location: {
                coordinates: {
                    longitude: user.longitude,
                    latitude: user.latitude
                }
            }
        }
    }
    
  
  render() {
    return (
        <header className="App-header">
            <Button variant="contained" color="primary" onClick={this.getUsersData} className="button">
                Get Data from API
            </Button>
            <Button variant="contained" color="secondary" onClick={this.pushToDb} className="button">
                Save Data to database
            </Button>
            <Button variant="contained" color="secondary" onClick={this.getUsersDataDb}className="button"> 
                Get Data from database
            </Button>
        </header>
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
export default connect(mapStateToProps, mapDispatchToProps)(Menu);