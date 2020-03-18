import React from 'react';
import { Link } from 'react-router-dom'
import '../app.css'
import './navbar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }


    handleDemo(e) {
        e.preventDefault();
        this.props.loginDemoUser().then(() => this.props.history.push('/'))
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="header">
                    <div className="nav">

                        <div className="left-nav">
                            Tickets
                        </div>

                        <div className="right-nav">
                            <Link to={'/tickets'}>tickets</Link>
                            <Link to={`/users/${this.props.currentUser.id}`}>{this.props.currentUser.firstName}</Link>
                            <Link to={'/new_ticket'}>Write a Ticket</Link>
                            <button onClick={this.logoutUser}>Logout</button>
                        </div>

                    </div>
                </div>
            );
        } else {
            return (
                <div className="header">
                    <div className="nav">
                        <div className="left-nav"> 
                            Tickets
                        </div>

                        <div className="right-nav">
                            <Link to={'/signup'}>Signup</Link>
                            <Link to={'/login'}>Login</Link>
                            <button onClick={this.handleDemo}>login as a demo user</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="hover-pointer container">
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar