import React from 'react'
import TicketIndexItem from './ticket_index_item'
import './ticket_index.css'

class TicketIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // in case of page refresh, fetch the current user to overwrite 
    // stale preloaded state from login and get updated starred list
    this.props.getOneUser(this.props.currentUser._id)
      switch (this.props.location.pathname) {
        case `/tickets/owner/${this.props.userId}`:
          return this.props.fetchOwnerTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}))
        case `/tickets/subscribed/${this.props.userId}`:
          return this.props.fetchSubscribedTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}))
        case `/tickets/creator/${this.props.userId}`:
          return this.props.fetchCreatedTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}))
        case `/tickets/starred/${this.props.userId}`: 
          return this.props.fetchStarredTickets(this.props.currentUser).then(action => this.setState({tickets: action.tickets}));
        default:
          return null
      }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      switch (this.props.location.pathname) {
        case `/tickets/owner/${this.props.userId}`:
          return this.props.fetchOwnerTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}))
        case `/tickets/subscribed/${this.props.userId}`:
          return this.props.fetchSubscribedTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}))
        case `/tickets/creator/${this.props.userId}`:
          return this.props.fetchCreatedTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}))
        case `/tickets/starred/${this.props.userId}`:
            return this.props.fetchStarredTickets(this.props.currentUser).then(action => this.setState({tickets: action.tickets}));
        default:
          return null
      }
    }
  }

  render() {
    if (!this.state.tickets) return null
    const tickets = Object.values(this.state.tickets);
    const { currentUser, updateUser } = this.props

    return (
      <div className="table">
        <div className="table-header-group">
          <div className="table-cell">Creator</div><div className="handle"></div>
          <div className="table-cell">Owner</div><div className="handle"></div>
          <div className="table-cell">Title</div><div className="handle"></div>
          <div className="table-cell">Created At</div><div className="handle"></div>
          <div className="table-cell">Updated At</div><div className="handle"></div>
          <div className="table-cell">Status</div><div className="handle"></div>
          <div className="table-cell">Priority</div><div className="handle"></div>
          <div className="table-cell">Start Date</div><div className="handle"></div>
          <div className="table-cell">End Date</div><div className="handle"></div>
          <div className="table-cell">Starred</div><div className="handle"></div>
        </div>
        <div className="table-row-group">
          {tickets.map(ticket => (
            <TicketIndexItem 
              key={ticket._id} 
              ticket={ticket} 
              currentUser={currentUser}
              starredIds={currentUser.starred}
              updateUser={updateUser}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TicketIndex
