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
        
        // let lusb = []

        // for (let i = 0; i < this.props.ticket.lastUpdateSeenBy.length; i++) {
        //     while (i < 3) {
        //         lusb.push(this.props.ticket.lastUpdateSeenBy[i].firstName)
        //         lusb.push(this.props.ticket.lastUpdateSeenBy[i].lastName)
        //     }
        // }
  
            if (this.state.collapsed) {       
                // return (
                //     <div>
                //         {lusb}
                //     </div>
                // )
                for (let i = 0; i < this.props.ticket.lastUpdateSeenBy.length; i++) {
                    while (i < 3) {
                            return (
                            <div>
                                Last Update Seen By: 
                                { " " } { this.props.ticket.lastUpdateSeenBy[i].firstName } { " " }
                                { this.props.ticket.lastUpdateSeenBy[i].lastName },
                            </div>
                        )}
                        return( 
                            <div>
                                + { this.props.ticket.lastUpdateSeenBy.length - 3 !== 0 ? this.props.ticket.lastUpdateSeenBy.length - 3 : null } more <select onClick = {this.handleClick}></select>
                            </div>
                        )}
                
            } else {

                for (let i = 0; i < this.props.ticket.lastUpdateSeenBy.length; i++) {
                    while (i < 3) {
                        return (
                            <div>
                                Last Update Seen By: 
                                {" "}{this.props.ticket.lastUpdateSeenBy[i].firstName}{" "}
                                {this.props.ticket.lastUpdateSeenBy[i].lastName},
                            </div>
                            
                    )}
                        return (
                            <div>
                                {" "}{this.props.ticket.lastUpdateSeenBy[i].firstName}{" "}
                                {this.props.ticket.lastUpdateSeenBy[i].lastName}
                                <select onClick={this.handleClick} ></select>
                            </div>
                    )
                }
            }

        }

    
} 

export default TicketUpdateItem