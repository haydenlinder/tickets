import React from "react";
import {Link, withRouter} from "react-router-dom"
class ActivityIndexItem extends React.Component {
  constructor(props) {
    super(props)


  this.convertDate = this.convertDate.bind(this)
  this.convertTime = this.convertTime.bind(this)
  }

  convertDate(time) {
    let date = new Date(time)
    return date.toDateString()
  }

  convertTime(time) {
    let date = new Date(time)
    let hours = date.getHours();
    let minutes = date.getMinutes();

    minutes = (minutes < 10) ? `0${minutes}` : minutes;

    let timeString

    if (hours === 0) {
        timeString = ` 12:${minutes}am `;
    } else if (hours === 12) {
      timeString = ` ${hours}:${minutes}pm`
    } else if (hours > 12) {
      hours = hours % 12
      timeString = ` ${hours}:${minutes}pm`
    } else {
      timeString = ` ${hours}:${minutes}am`
    }

    return timeString
  }

  render() {
    return (
      <div className="activity-item">
        <Link to={`/users/${this.props.update.userId}`}>{this.props.update.firstName} {this.props.update.lastName}</Link>&nbsp;
        updated the ticket on {this.convertDate(this.props.update.time)} at {this.convertTime(this.props.update.time)}
      </div>
    );
  }
}

export default withRouter(ActivityIndexItem);

