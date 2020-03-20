import React from 'react';

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updatedAt: Date.now,
            tags: [],
            subscribers: [],
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
        this.handlesubmit = this.handlesubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.ticketId !== 'new') {
            this.props.getTicket(this.props.ticketId)
            .then((ticket) => {
                this.setState({

                    updatedAt: ticket.updatedAt,
                    tags: ticket.tags,
                    subscribers: ticket.subscribers,
                    owner: ticket.owner,
                    title: ticket.title,
                    body: ticket.body,
                    lastUpdateSeenBy: ticket.lastUpdateSeenBy,
                    updatedBy: ticket.updatedBy,
                    status: ticket.status,
                    priority: ticket.priority,
                    dependsOn: ticket.dependsOn,
                    blocks: ticket.blocks,
                    startDate: ticket.startDate,
                    endDate: ticket.endDate,
                    creator: ticket.creator
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

    handlesubmit(e) {
        e.preventDefault();
        this.props.createTicket(this.state)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render(){

        if (this.props.ticketId !== 'new') {
            this.view();
            if (!this.props.ticket) return null
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
                        onClick={this.handlesubmit}
                        className="button1">
                        {this.props.ticketId === 'new' ? 'create' : 'save'}
                    </button>
                </form>
            </div>
        )
        
        
    }

}

export default TicketForm;