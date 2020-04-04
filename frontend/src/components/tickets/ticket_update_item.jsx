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

    render() {
  
        if (this.state.collapsed) {
            return (
                <div>
                    Last update seen by
                    <div>
                        { " " } { this.props.ticket.lastUpdateSeenBy[0].firstName } { " " }
                        { this.props.ticket.lastUpdateSeenBy[0].lastName },
                        { " " } { this.props.ticket.lastUpdateSeenBy[1].firstName } { " " }
                        { this.props.ticket.lastUpdateSeenBy[1].lastName },
                        { " " } { this.props.ticket.lastUpdateSeenBy[2].firstName } { " " }
                        { this.props.ticket.lastUpdateSeenBy[2].lastName } +
                        { this.props.ticket.lastUpdateSeenBy.length - 3 !== 0 ? this.props.ticket.lastUpdateSeenBy.length - 3 : null } <select onClick = { this.handleClick }> { " "}{ this.props.ticket.lastUpdateSeenBy[3].firstName } { " " }
                        { this.props.ticket.lastUpdateSeenBy[3].lastName }</select> more
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    Last update seen by
                    <div>
                        {" "}{this.props.ticket.lastUpdateSeenBy[0].firstName}{" "}
                        {this.props.ticket.lastUpdateSeenBy[0].lastName},
                        {" "}{this.props.ticket.lastUpdateSeenBy[1].firstName}{" "}
                        {this.props.ticket.lastUpdateSeenBy[1].lastName},
                        {" "}{this.props.ticket.lastUpdateSeenBy[2].firstName}{" "}
                        {this.props.ticket.lastUpdateSeenBy[2].lastName}
                    </div>
                    <div>
                        {" "}{this.props.ticket.lastUpdateSeenBy[3].firstName}{" "}
                        {this.props.ticket.lastUpdateSeenBy[3].lastName}
                        <select onClick={this.handleClick} ></select>
                    </div>

                </div>
            )
        }
    }

} 

export default TicketUpdateItem