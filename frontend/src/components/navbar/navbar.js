import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../app.css'
import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
   
    this.writeTicket = this.writeTicket.bind(this)
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/")
  }

  writeTicket(e) {
    e.preventDefault()
    this.props.history.push("/tickets/new")
  }

  handleClick(e) {
    e.preventDefault();
    this.props.loginDemoUser()
    this.props.history.push("/tickets/owner");
    this.props.clearErrors()
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="header">
          <div className="nav">
            <Link className="link-style-header" to={`/tickets/owner/${this.props.currentUser.id}`}> Tickets</Link>
  
            <div className="right-nav">
              
              <Link className="link-style"to={`/users/${this.props.currentUser.id}`}>
                {this.props.currentUser.firstName} &nbsp;
                {this.props.currentUser.lastName}
              </Link>
                {this.props.currentUser.organization}

              
              <button className="button1" onClick={this.writeTicket}> 
                + new ticket
              </button>
      
              <button className="button1" onClick={this.logoutUser}>
                Logout
              </button>
              
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="nav">
            <div className="left-nav">Tickets</div>

            <div className="right-nav">
              {this.props.path === "/signup" ? <Link className="link-style" to={"/login"}>Login</Link> : <Link className="link-style" to={"/signup"}>Signup</Link> }
              {this.props.path === "/" ? <Link className="link-style" to={"/login"}>Login</Link> : null}
              <button className="button1 " onClick={this.handleClick}>
                login as a demo user
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div className="hover-pointer container">{this.getLinks()}</div>;
  }
}


export default withRouter(NavBar)