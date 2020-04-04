import React from 'react'
import {withRouter} from 'react-router-dom'

class CommentForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            body: this.props.body || '',
            author: this.props.currentUser._id,
            ticketId: this.props.ticketId
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(field) {
        this.props.action(this.state)
        .then(() => this.setState({ body: "" }))
    }

    update(field) {
       return e => {
            this.setState({ [field]: e.currentTarget.value})
        } 
    }

    render() {
        return (
          <form className="comment-form" onSubmit={this.handleSubmit}>
            <div>
              <span className="comment-errors">{this.props.errors.body}</span>
            </div>
            <div className="avitar">
              {this.props.currentUser.firstName.slice(0, 1)}
              {this.props.currentUser.lastName.slice(0, 1)}
            </div>
            <input
              type="textarea"
              value={this.state.body}
              onChange={this.update("body")}
            />
            <button className="button1">Create Comment</button>
          </form>
        );
    }
  
}

export default withRouter(CommentForm)