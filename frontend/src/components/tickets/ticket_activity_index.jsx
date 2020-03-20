import React from "react"
import ActivityIndexItem from "./activity_index_item"

class TicketActivityIndex extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getTicket()
    }

    render() {
        const {tickets} = this.props
        return(
            <div>
                <h1>Tickets:</h1>
                {
                tickets.map(ticket => (
                    <ActivityIndexItem 
                        ticket={ticket}
                        key={ticket.id}                      
                    />                    
                ))}
            </div>
        )
    }
}


export default TicketActivityIndex
