import React from 'react'

class TicketUpdateItem extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            collapsed: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.getTicket(this.props.match.params.ticketId)
    }

    handleClick(e) {
        e.preventDefault()
        this.setState({collapsed: !this.state.collapsed})
    }

    getUpdates() {
        const { ticket } = this.props

        if (this.state.collapsed) {
            if (ticket.lastUpdateSeenBy.length <= 3) {
                return (
                    <div>
                        Last Update Seen By:
                        {ticket.lastUpdateSeenBy.map((user, i) => <span> {ticket.lastUpdateSeenBy[i].firstName} {ticket.lastUpdateSeenBy[i].lastName}, </span>)}
                    </div>
                )
            }
            return (
                <div onClick={this.handleClick}>
                    Last Update Seen By: 
                    {ticket.lastUpdateSeenBy.slice(0, 3).map((user, i) => <span> {ticket.lastUpdateSeenBy[i].firstName} {ticket.lastUpdateSeenBy[i].lastName}, </span>)}
                    + {ticket.lastUpdateSeenBy.length - 3} more {'▼'}
                </div>
            )
        } else {
            return (
                <div onClick={this.handleClick}>
                    <ul>
                        Last Update Seen By:
                        {ticket.lastUpdateSeenBy.map((user, i) => <li> {ticket.lastUpdateSeenBy[i].firstName} {ticket.lastUpdateSeenBy[i].lastName}, </li>)}
                        {'▲'}
                    </ul>
                </div>

            )
        }
    }

    render() {
            return <div>{this.getUpdates()}</div>
        }

    
} 

export default TicketUpdateItem