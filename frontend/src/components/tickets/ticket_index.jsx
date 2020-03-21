import React from 'react'
import TicketIndexItem from './ticket_index_item'
import { Link } from 'react-router-dom'
import TicketForm from './ticket_form'

class TicketIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showComponent: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        switch (this.props.location.pathname) {
            case '/owner':
                return this.props.fetchOwnerTickets(this.props.match.params.userId)
            case '/subscriber':
                return 
            case '/created':
                return this.props.fetchCreatedTickets(this.props.match.params.userId)
            case '/starred': 
                return 
            default:
                return this.props.getTickets()
        }
    }

    handleClick() {
        this.setState({
            showComponent: true
        })    
    }

    render() {
        const { tickets } = this.props
        return(
            <div>
                <ul>
                    {tickets.map(ticket => <li><TicketIndexItem key={ticket.id} ticket={ticket} /></li>)}
                </ul>
                <button onClick={this.handleClick}>ticket form for ticket</button>
                {this.state.showComponent ? <TicketForm /> : null}
                {/* <Link to={`/tickets/${props.ticket.id}`} onClick={e => this.handleClick(e)}>ticket form for ticket</Link> */}
            </div>
        )
    }
}

export default TicketIndex
