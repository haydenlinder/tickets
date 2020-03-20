import React from "react"
import ActivityIndexItem from "./activity_index_item"

class TicketActivityIndex extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getTicket(this.props.match.params.ticketId)
    }

    render() {
        const {ticket, comments} = this.props
        return(
            <div>
                <h1>Ticket Activity:</h1>
                    <ActivityIndexItem 
                        ticket={ticket}   
                        comments={comments}                   
                    />                    
                ))}
            </div>
        )
    }
}


export default TicketActivityIndex
