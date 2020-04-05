import React from 'react'
import TicketIndexItem from './ticket_index_item'
import './ticket_index.css'

class TicketIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: undefined,
      sortedBy: {
        attr: 'creator',
        ord: true
      }
    };
  }

  componentDidMount() {
    setTimeout(() => this.formatTable(), 1000);
    // in case of page refresh, fetch the current user to overwrite 
    // stale preloaded state from login and get updated starred list
    this.props.getOneUser(this.props.currentUser._id)
      switch (this.props.location.pathname) {
        case `/tickets/owner/${this.props.userId}`:
          return this.props.fetchOwnerTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}));
        case `/tickets/subscribed/${this.props.userId}`:
          return this.props.fetchSubscribedTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}));
        case `/tickets/creator/${this.props.userId}`:
          return this.props.fetchCreatedTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}));
        case `/tickets/starred/${this.props.userId}`: 
          return this.props.fetchStarredTickets(this.props.currentUser).then(action => this.setState({tickets: action.tickets}));
        default:
          return null;
      }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      switch (this.props.location.pathname) {
        case `/tickets/owner/${this.props.userId}`:
          return this.props.fetchOwnerTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}));
        case `/tickets/subscribed/${this.props.userId}`:
          return this.props.fetchSubscribedTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}));
        case `/tickets/creator/${this.props.userId}`:
          return this.props.fetchCreatedTickets(this.props.match.params.userId).then(action => this.setState({tickets: action.tickets}));
        case `/tickets/starred/${this.props.userId}`:
            return this.props.fetchStarredTickets(this.props.currentUser).then(action => this.setState({tickets: action.tickets}));
        default:
          return null;
      }
    }
  }

  formatTable() {
    let handles = document.getElementsByClassName('handle');
    let clickPos;

    for (let i = 0; i < handles.length; i++) {
      handles[i].addEventListener('mousedown', (e) => {
        e.preventDefault();
        clickPos = e.pageX;
      })

      handles[i].addEventListener('mousemove', (e) => {
        if (!clickPos) return 0;
        let dx = e.pageX - clickPos;
        let leftSib = e.target.previousElementSibling;
        let colNum = e.target.classList[1];
        let colHandles = document.getElementsByClassName('colNum')

      })
    } 

  }

  sortTicketsBy(attr) {
    let tickets = Object.values(this.state.tickets);
    let sortedTickets;
    
    sortedTickets = tickets.sort((t1, t2) => {
      let attr1 = t1[attr];
      let attr2 = t2[attr];
      switch (attr) {
        case 'owner':
          attr1 = attr1.firstName;
          attr2 = attr2.firstName;
          break;
        case 'creator':
          attr1 = attr1.firstName;
          attr2 = attr2.firstName;
          break;
        case 'updatedAt':
          attr1 = attr1[0];
          attr2 = attr2[0];
          break;
        default:
          break;
      }
      if (this.state.sortedBy.ord) {
        return attr1 < attr2 ? 1 : attr1 > attr2 ? -1 : 0;
      } else {
        return  attr1 > attr2 ? 1 : attr1 < attr2 ? -1 : 0;
      }
    });

    this.setState({
      tickets: sortedTickets,
      sortedBy: {
        attr: attr,
        ord: !this.state.sortedBy.ord,
      }
    });
  } 

  render() {
    if (!this.state.tickets) return null
    const tickets = Object.values(this.state.tickets);
    const { currentUser, updateUser } = this.props;
    const { sortedBy } = this.state;
    return (
      <div className="table">
        <div className="table-header-group">
          <div className="table-cell" onClick={() => this.sortTicketsBy('creator')}>Creator {sortedBy.attr !== 'creator' ? null : sortedBy.ord ? '▲' : '▼' }</div><div className="handle 1"></div>
          <div className="table-cell" onClick={() => this.sortTicketsBy('owner')}>Owner {sortedBy.attr !== 'owner' ? null : sortedBy.ord ? '▲' : '▼'}</div><div className="handle 2"></div>
          <div className="table-cell" onClick={() => this.sortTicketsBy('title')}>Title {sortedBy.attr !== 'title' ? null : sortedBy.ord ? '▲' : '▼'}</div><div className="handle 3"></div>
          <div className="table-cell" onClick={() => this.sortTicketsBy('createdAt')}>Created At {sortedBy.attr !== 'createdAt' ? null : sortedBy.ord ? '▲' : '▼'}</div><div className="handle 4"></div>
          <div className="table-cell" onClick={() => this.sortTicketsBy('updatedAt')}>Updated At {sortedBy.attr !== 'updatedAt' ? null : sortedBy.ord ? '▲' : '▼'}</div><div className="handle 5"></div>
          <div className="table-cell" onClick={() => this.sortTicketsBy('status')}>Status {sortedBy.attr !== 'status' ? null : sortedBy.ord ? '▲' : '▼'}</div><div className="handle 6"></div>
          <div className="table-cell" onClick={() => this.sortTicketsBy('priority')}>Priority {sortedBy.attr !== 'priority' ? null : sortedBy.ord ? '▲' : '▼'}</div><div className="handle 7"></div>
          <div className="table-cell" onClick={() => this.sortTicketsBy('startDate')}>Start Date {sortedBy.attr !== 'startDate' ? null : sortedBy.ord ? '▲' : '▼'}</div><div className="handle 8"></div>
          <div className="table-cell" onClick={() => this.sortTicketsBy('endDate')}>End Date {sortedBy.attr !== 'endDate' ? null : sortedBy.ord ? '▲' : '▼'}</div><div className="handle 9"></div>
          <div className="table-cell">Starred</div>
        </div>
        <div className="table-row-group">
          {tickets.map(ticket => {
            return (
              <TicketIndexItem 
                key={ticket._id} 
                ticket={ticket} 
                currentUser={currentUser}
                starredIds={currentUser.starred}
                updateUser={updateUser}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default TicketIndex
