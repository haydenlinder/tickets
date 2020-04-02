import React from 'react'
import {Link, withRouter} from "react-router-dom"

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      body: this.props.comment.body,
      _id: this.props.comment.commentId
    };

    this.convertDate = this.convertDate.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleDelete(e) {
      this.props.deleteComment(this.props.comment.commentId);
  }

  handleSubmit(e) {
      e.preventDefault()
      this.props.updateComment(this.state)
  }

  editCommentDiv() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <textarea
              name={this.props.comment.body}
              value={this.state.body}
              onChange={this.handleUpdate("body")}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      );
  }

  commentBodyDiv() {
    return (
      <div>
        <Link to={`/users/${this.props.comment.userId}`}>
          {this.props.comment.firstName} {this.props.comment.lastName}
        </Link>
        "{this.props.comment.body}"{this.convertDate(this.props.comment.time)}{" "}
        at
        {this.convertTime(this.props.comment.time)}
        <button className="button1" onClick={this.handleDelete}>
          Delete
        </button>
        <button
          className="button1"
          onClick={() => this.setState({ edit: true })}
        >
          Edit Comment
        </button>
      </div>
    );
  }
  
  handleUpdate(field) {
      return e => {
          this.setState({ [field]: e.currentTarget.value });
      };
  }

  convertDate(time) {
    let date = new Date(time);
    return date.toDateString()
  }

  convertTime(time) {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    let timeString;

    if (hours == "0") {
        timeString = ` 12:${minutes}am `;
    } else if (hours === 12) {
      timeString = ` ${hours}:${minutes}pm`;
    } else if (hours > 12) {
      hours = hours % 12
      timeString = ` ${hours}:${minutes}pm`;
    } else {
      timeString = ` ${hours}:${minutes}am`;
    }

    return timeString;
  }

  render() {
    return (
      <div>
        {this.state.edit ? this.editCommentDiv() : this.commentBodyDiv()}
      </div>
    );
  }
  
} 

export default withRouter(CommentIndexItem)