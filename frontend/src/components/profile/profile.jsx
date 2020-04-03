import React from "react"
import { Link } from "react-router-dom"

import './profile.css'

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.convertTime = this.convertTime.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  componentDidMount() {
    this.props.fetchCreatedTickets(this.props.match.params.userId);
    this.props.fetchUserComments(this.props.match.params.userId);
  }

  convertTime(time) {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    let timeString;

    if (hours === 0) {
      timeString = ` 12:${minutes}am `;
    } else if (hours === 12) {
      timeString = ` ${hours}:${minutes}pm`;
    } else if (hours > 12) {
      hours = hours % 12;
      timeString = ` ${hours}:${minutes}pm`;
    } else {
      timeString = ` ${hours}:${minutes}am`;
    }
    return timeString;
  }

  convertDate(time) {
    let date = new Date(time);
    return date.toDateString();
  }

  render() {
    const { user, comments, tickets } = this.props;

    const sortedArray = tickets.concat(comments).sort((ele1, ele2) =>
    ele1.createdAt < ele2.createdAt ? 1 : ele1.createdAt > ele2.createdAt ? -1 : 0)
    
    return (
      <div className="profile-container">
        <div className="profile-header-container">
          <div className="avitar">
            {user.firstName.slice(0,1)}
            {user.lastName.slice(0,1)}
          </div>
          <div className="name">
            {user.firstName} {user.lastName} 
          </div>
          <div className="start-date">
            Started on {this.convertDate(user.createdAt)}
          </div>
        </div>
        <div className="activity-index">

          {sortedArray.map(item => {
            if (item.creator) {
              return (
                <div className="index-item">
                  <b className="green">+</b> {item.creator.firstName} {item.creator.lastName} created <Link to={`/tickets/${item._id}`}>{item._id} "{item.title}"</Link> on {this.convertDate(item.createdAt)} at {this.convertTime(item.createdAt)}
                </div>
              )
            } else {
              return (
                <div className="index-item">
                  <b className="blue">✎</b> {item.author.firstName} {item.author.lastName} commented <i>"{item.body.length < 25 ? item.body : item.body.slice(0,25) + '...'}"</i> on <Link to={`/tickets/${item.ticket._id}`}>{item.ticket._id} "{item.ticket.title}"</Link> {this.convertDate(item.createdAt)} {this.convertTime(item.createdAt)}
                </div>
              );
            }
          })}

        </div>
      </div>
    );
  }

}

export default Profile