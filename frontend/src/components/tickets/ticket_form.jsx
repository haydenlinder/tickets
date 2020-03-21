import React from 'react';

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updatedAt: [],
            tags: [],
            subscribers: [this.props.currentUser.id],
            owner: undefined,
            title: '',
            body: '',
            lastUpdateSeenBy: [],
            updatedBy: [],
            status: 'No Progress',
            priority: 'Low', 
            dependsOn: [],
            blocks: [],
            startDate: undefined,
            endDate: undefined,
            creator: this.props.currentUser.id
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.ticketId !== 'new') {
            this.props.getTicket(this.props.ticketId)
            .then((res) => {
                this.setState({
                    updatedAt: res.ticket.updatedAt,
                    tags: res.ticket.tags,
                    subscribers: res.ticket.subscribers,
                    owner: res.ticket.owner,
                    title: res.ticket.title,
                    body: res.ticket.body,
                    lastUpdateSeenBy: res.ticket.lastUpdateSeenBy,
                    updatedBy: res.ticket.updatedBy,
                    status: res.ticket.status,
                    priority: res.ticket.priority,
                    dependsOn: res.ticket.dependsOn,
                    blocks: res.ticket.blocks,
                    startDate: res.ticket.startDate,
                    endDate: res.ticket.endDate,
                    id: res.ticket._id
                })
            })
        }
    }

    view() {
        if (!this.state.lastUpdateSeenBy.includes(this.props.currentUser.id)) {
            this.state.lastUpdateSeenBy.push(this.props.currentUser.id)
            this.props.updateTicket(this.state)
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.state.updatedAt.unshift(Date.now());
        this.state.updatedBy.unshift(this.props.currentUser.id)
        this.state.lastUpdateSeenBy = []

        if (this.props.ticketId !== "new") {
            this.props.updateTicket(this.state)
        } else {
            this.props.createTicket(this.state)
            .then(res => this.props.history.push(`${res.ticket._id}`))
        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render(){

        if (this.props.ticketId !== 'new') {
            if (!this.props.ticket) return null
            this.view();
        }
        const statusSelect = (
            <select 
                defaultValue={this.state.status}
                onChange={this.update('status')}
            >
                <option 
                    value="No Progress"
                >
                    No Progress
                </option>

                <option 
                    value="Planned"
                >
                    Planned
                </option>

                <option 
                    value="Blocked"
                >
                    Blocked
                </option>

                <option 
                    value="In Progress"
                >
                    In Progress
                </option>

                <option 
                    value="Closed"
                >
                    Closed
                </option>
            </select>

        )

        const prioritySelect = (
            <select 
                defaultValue={this.state.priority} 
                onChange={this.update('priority')}
            >
                <option 
                    value="Low"
                >
                    Low
                </option>

                <option 
                    value="Medium"
                >
                    Medium
                </option>

                <option 
                    value="High"
                >
                    High
                </option>

                <option 
                    value="CATastrophic"
                >
                    CATastrophic
                </option>

            </select>
        )

        return(
            <div className="form-container">
                <form className="form">
                    <input 
                        type="text" 
                        placeholder="title" 
                        value={this.state.title}
                        onChange={this.update('title')}
                    />

                    <input 
                        type="text" 
                        placeholder="owner" 
                        value={this.state.owner}
                        onChange={this.update('owner')}
                    />

                    <textarea 
                        cols="30" rows="10"
                        value={this.state.body}
                        placeholder="body"
                        onChange={this.update('body')}
                    >

                    </textarea>

                    {statusSelect}

                    {prioritySelect}

                    <input 
                        type="text"
                        placeholder="depends on" 
                        onChange={this.update('dependsOn')}
                    />

                    <input 
                        type="text"
                        value={this.state.blocks}
                        placeholder="blocks" 
                        onChange={this.update('blocks')}
                    />

                    
                    <input 
                        type="date"
                        value={this.state.startDate}
                        onChange={this.update('startDate')}
                    />

                    <input 
                        type="date"
                        value={this.state.endDate}
                        onChange={this.update('endDate')}
                    />

                    <button 
                        onClick={this.handleSubmit}
                        className="button1">
                        {this.props.ticketId === 'new' ? 'create' : 'save'}
                    </button>
                </form>
            </div>
        )
        
        
    }

}

export default TicketForm;