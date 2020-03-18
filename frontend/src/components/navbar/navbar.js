import React from 'react';
import { Link } from 'react-router-dom'
import '../app.css'

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

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to={'/tickets'}>tickets</Link>
                    <Link to={'/profile'}>Profile</Link>
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
            <div className="hover-pointer container">
                <h1>Tickets</h1>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar