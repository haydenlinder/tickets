import React from 'react'

class CommentForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { body: ''}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

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

export default CommentForm