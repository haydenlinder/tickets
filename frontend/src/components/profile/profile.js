import React from "react"
import { Link } from "react-router-dom"

class Profile extends React.Component {
    constructor(props) {
        super(props)
          
    }

    componentDidMount() {
        this.props.fetchCreatedTickets(this.props.params.match.userId)
        this.props.fetchUserComments(this.props.params.match.userId)
    }

    render() {
        
        const {user, comments, tickets} = this.props;

        const userCommentInfo = comments.map(ticket => (
          <div>
            <span>
              {ticket.createdAt}
              {ticket.author.firstName}
              {ticket.author.lastName} commented on
            </span>
            <Link to={`/comments/${ticket.id}`}>{ticket.id}</Link>
          </div>
        )); 

        const userTicketInfo = tickets.map( ticket =>  
            <div>
                <span> 
                    {ticket.createdAt} 
                    {ticket.creator.firstName}  
                    {ticket.creator.lastName} created
                </span>
                <Link to={`/tickets/${ticket.id}`}>
                    {ticket.id}
                </Link> 
            </div>
        ) 

        return (
            <div>
                <div className="profile-header-container">
                    <h1>Hello! {user.firstName} {user.lastName}</h1>
                </div>

            <div>{userTicketInfo}</div>
            <div>{userCommentInfo}</div>
        </div>
        );
    }
}

export default Profile