import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import UserCard from './UserCard';


class List extends React.Component {
    state = {
        currentShowing: 20,
        calButtonClicked: false
    }

    showMore = () => {
        this.setState(prevState => ({currentShowing: prevState.currentShowing += 20}))
    }
  
    toggleClick = () => {
        this.setState((prevState) => ({calButtonClicked: !prevState.calButtonClicked}))
    }


    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.users !== prevProps.users){
            this.setState({currentShowing: this.props.users.length > 20 ? 20 : this.props.users.length })
        }
    }
  
    render() {
        return (
            <div className="App-body">
                <div className="header">
                    <div className="title">
                        <span className="description">{ this.props.users.length>0 && `Showing ${this.state.currentShowing} users in ${this.props.users.length} users`}</span>
                        <Button variant="contained" onClick={this.toggleClick} className="button">{this.state.calButtonClicked ? 'Hide' : 'Show Stats'}</Button> 
                    </div>
                </div>
                {
                    this.state.calButtonClicked && (
                        <div className="statistic">
                            { this.props.averageAge && (<div className="age">
                                <p>{this.props.averageAge}</p>
                            </div>)}
                            {   this.props.oldest && <div className="oldest">
                                    <span>Oldest person:</span>
                                    <UserCard user={this.props.oldest}/> 
                                </div>
                            }
                            {   this.props.youngest && <div className="youngest">
                                    <span>Youngest person:</span>
                                    <UserCard user={this.props.youngest}/> 
                                </div>
                            }
                            {   this.props.oldest && <div className="northen">
                                    <span>Northern-most person:</span>
                                    <UserCard user={this.props.northernMost}/> 
                                </div>
                            }
                            {   this.props.oldest && <div className="southern">
                                    <span>Southern-most person:</span>
                                    <UserCard user={this.props.southernMost}/> 
                                </div>
                            }
                        </div>
                    )
                }
                { this.state.calButtonClicked && <hr></hr>}
                <div className="users-container">
                {
                    this.props.users.length > 0 ? this.props.users.map((user, index) => (index < this.state.currentShowing) &&(
                        <div key={index}>
                            <UserCard user={user}/>
                        </div>
                    )) : <div>
                            <p>No Users</p>
                            <p>You can retrieve data from Random User API or pre-data from DynamoDB</p>
                        </div>
                }    
                </div>
                {
                    this.props.users.length>0 && 
                    (
                        (this.state.currentShowing === this.props.users.length && this.props.users.length>20)?
                            <Button variant="contained" color="primary">Collapse</Button>
                            :
                            (this.props.users.length - this.state.currentShowing) >= 20 ? 
                                <Button variant="contained" color="primary" onClick={this.showMore}>Show more</Button>
                                :
                                (this.props.users.length > 20) ? <Button variant="contained" color="primary"> Show the rest {this.props.users.length - this.state.currentShowing} user(s)</Button>
                                    : ''
                    )

                }
            </div>
        );
    }
}

  
const mapStateToProps = (state) => {
    return {
        ...state
    };
};
  
export default connect(mapStateToProps)(List);