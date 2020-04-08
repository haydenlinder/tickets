import React from 'react';
import { Link } from 'react-router-dom';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state =  {
      edit: false,
      body: this.props.comment.body,
      _id: this.props.comment.commentId,
      editErrors: false
    }
  
    this.convertDate = this.convertDate.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editCommentDiv = this.editCommentDiv.bind(this)
  }

  handleDelete(e) {
      this.props.deleteComment(this.props.comment.commentId);
  }
  
  handleSubmit(e) {
      e.preventDefault()
      if (!this.state.body) {
        this.setState({editErrors: true})
        return null
      }
      this.props.updateComment(this.state)
      this.setState({body: ""})
  }

  editCommentDiv() {
        return (
          <div>
            {this.state.editErrors ? (
              <div className="errors"> comment must have a body </div>
            ) : null}
            <form onSubmit={this.handleSubmit}>
              <textarea
                name={this.props.comment.body}
                value={this.state.body}
                onChange={this.handleUpdate("body")}
              />
              <button className="button1" type="submit">
                Save
              </button>
            </form>
          </div>
        );
  }

  commentBodyDiv() {
    return (
      
      <div className="comment-container">
        <div className="author">
          <div className="avitar">
            {this.props.comment.firstName.slice(0, 1)}
            {this.props.comment.lastName.slice(0, 1)}
          </div>
          <Link to={`/users/${this.props.comment.userId}`}>
            {this.props.comment.firstName} {this.props.comment.lastName}
          </Link>
        </div>
        <div className="top">
          <div className="body">{this.props.comment.body}</div>
          <div className="bottom">
            <div className="time">
              {this.convertDate(this.props.comment.time)} at
              {this.convertTime(this.props.comment.time)}
            </div>
            <div className="buttons">
              {this.props.currentUserId === this.props.comment.userId ? (
                <button className="button1" onClick={this.handleDelete}>
                  Delete
                </button>
              ) : null}

              {this.props.currentUserId === this.props.comment.userId ? (
                <button
                  className="button1"
                  onClick={() => 
                    this.setState({ edit: true })
                  }
                >
                  Edit Comment
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  handleUpdate(field) {
        return e => {
          this.setState({ [field]: e.currentTarget.value });
      }
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

    if (hours === 0) {
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
        {this.state.edit ?  this.editCommentDiv()
        : this.commentBodyDiv()}
      </div>
    );
  }
  
} 

export default CommentIndexItem