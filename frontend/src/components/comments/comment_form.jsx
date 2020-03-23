import React from 'react'
import {withRouter} from 'react-router-dom'

class CommentForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            body: '',
            author: this.props.currentUser._id,
            ticketId: this.props.ticketId
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    navigate

    handleSubmit() {
        this.props.createComment(this.state)
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value})
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="textarea" value={this.state.body} onChange={this.update('body')}/>
                <button className="button1">Create Comment</button>
            </form>
        )
    }
  
}

export default withRouter(CommentForm)