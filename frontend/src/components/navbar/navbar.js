import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import '../app.css'
import './navbar.css'
import UserSearchContainer from './user_search_container' 

const getQueryString = (type, userId) => {
  let params = new URLSearchParams();
  let priorities = ['Low', 'Medium', 'High', 'CATastrophic'];
  let statuses = ['No Progress', 'Planned', 'In Progress', 'Blocked'];
  priorities.forEach(pri => params.append('priority', pri));
  statuses.forEach(status => params.append('status', status));
  params.set(type, userId);
  if (type === 'subscribed') {
    params.set(`${type}Inclusion`, 'all');
  } else {
    params.set(`${type}Inclusion`, 'is');
  };
  return params.toString();
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
   
    this.writeTicket = this.writeTicket.bind(this)
    this.receiveUserLogout = this.receiveUserLogout.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  receiveUserLogout(e) {
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

    const { loginDemoUser, clearErrors } = this.props;
    clearErrors();
    loginDemoUser()
    .then(() => {
      this.props.history.push(
        `/tickets/search?${getQueryString('owner', this.props.currentUser._id)}`
      )
    });
  };

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    let { currentUser } = this.props
    if (currentUser) {
      return (
        <div className="header">
          <div className="nav">
            <Link className="link-style-header" to={`/tickets/search?${getQueryString('owner', currentUser._id)}`}> Tickets</Link>

            <UserSearchContainer />

            <div className="right-nav">
              
              <button className="btn1 new-ticket" onClick={this.writeTicket}> 
                + New Ticket
              </button>
              <Link className="link-style"to={`/users/${currentUser._id}`}>
                <div className="avitar">
                  {currentUser.firstName.slice(0,1)}{currentUser.lastName.slice(0,1)}
                </div> 
                {currentUser.firstName} {currentUser.lastName}
              </Link>
                {currentUser.orgHandle}
      
              <button className="btn1 logout" onClick={this.receiveUserLogout}>
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
              <button className="btn1 random" onClick={this.handleClick}>
                login as a random user
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