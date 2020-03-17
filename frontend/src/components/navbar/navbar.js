import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }
    
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to={'/tickets'}>All Tickets</Link>
                    <Link to={'/tags'}>Profile</Link>
                    <Link to={'/new_ticket'}>Write a Ticket</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={'/signup'}>Signup</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Comments</h1>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar