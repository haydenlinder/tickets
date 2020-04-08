import React from 'react'
import TicketIndexItem from './ticket_index_item'
import './ticket_index.css'

class TicketIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: undefined,
      resizing: false,
      sortedBy: {
        attr: 'endDate',
        ord: true
      }
    };
  }

  receiveTickets(action) {
    this.setState({ 
      tickets: action.tickets, 
      sortedBy: {
        attr: this.state.sortedBy.attr,
        ord: !this.state.sortedBy.ord
      } 
    });
    this.formatTable();
    this.sortTicketsBy(this.state.sortedBy.attr)
  }

  componentDidMount() {
    // in case of page refresh, fetch the current user to overwrite 
    // stale preloaded state from login and get updated starred list
    this.props.getOneUser(this.props.currentUser._id)
    switch (this.props.location.pathname) {
      case `/tickets/owner/${this.props.userId}`:
        this.props.fetchOwnerTickets(this.props.match.params.userId)
        .then(action => this.receiveTickets(action))
        break;
      case `/tickets/subscribed/${this.props.userId}`:
        this.props.fetchSubscribedTickets(this.props.match.params.userId)
        .then(action => this.receiveTickets(action))
        break;
      case `/tickets/creator/${this.props.userId}`:
        this.props.fetchCreatedTickets(this.props.match.params.userId)
        .then(action => this.receiveTickets(action))
        break;
      case `/tickets/starred/${this.props.userId}`: 
        this.props.fetchStarredTickets(this.props.currentUser)
        .then(action => this.receiveTickets(action))
        break;
      default:
        break;
    }
      
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      switch (this.props.location.pathname) {
        case `/tickets/owner/${this.props.userId}`:
          this.props.fetchOwnerTickets(this.props.match.params.userId)
          .then(action => this.receiveTickets(action))
          break;
        case `/tickets/subscribed/${this.props.userId}`:
          this.props.fetchSubscribedTickets(this.props.match.params.userId)
          .then(action => this.receiveTickets(action))
          break;
        case `/tickets/creator/${this.props.userId}`:
          this.props.fetchCreatedTickets(this.props.match.params.userId)
          .then(action => this.receiveTickets(action))
          break;
        case `/tickets/starred/${this.props.userId}`:
          this.props.fetchStarredTickets(this.props.currentUser)
          .then(action => this.receiveTickets(action))
          break;
        default:
          break;
      }
    }
  }

  formatTable() {
    let handles = document.getElementsByClassName('handle');
    let clickPos, colNum, leftWidth, rightWidth;

    for (let i = 0; i < handles.length; i++) {
      // when navigating to a new page after resize,
      // resize elements that weren't yet created to resized width:
      if (i < 9) {
        let width = handles[i].previousElementSibling.offsetWidth;
        let rwidth = handles[8].nextElementSibling.offsetWidth;
        let toBeResized = document.getElementsByClassName(`${i + 1}`)
        for (let j = 0; j < toBeResized.length; j++) {
          toBeResized[j].previousElementSibling.style.width = width + 'px';
          if (i === 8) toBeResized[j].nextElementSibling.style.width = rwidth + 'px';
        }
      }
      // eslint-disable-next-line
      handles[i].addEventListener('mousedown', (e) => {
        this.setState({ resizing: true });
        clickPos = e.pageX;
        colNum = e.target.classList[1];
        leftWidth = e.target.previousElementSibling.offsetWidth;
        rightWidth = e.target.nextElementSibling.offsetWidth;
      }, false);
      // eslint-disable-next-line
      window.addEventListener('mousemove', (e) => {
        if (!clickPos) return 0;
        let dx = e.pageX - clickPos;
        
        let colHandles = document.getElementsByClassName(colNum)

        for (let j = 0; j < colHandles.length; j++) {
          let leftSib = colHandles[j].previousElementSibling;
          let rightSib = colHandles[j].nextElementSibling;
  
          leftSib.style.width = leftWidth + dx + 'px';
          rightSib.style.width = rightWidth - dx + 'px';
        }
      });
      // eslint-disable-next-line
      window.addEventListener('mouseup', (e) => {
        if (!clickPos) return 0
        clickPos = undefined;
        setTimeout(() => {
          this.setState({ resizing: false })
        }, 300)
      });
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
          attr1 = (attr1.firstName + ' ' + attr1.lastName).toLowerCase();
          attr2 = (attr2.firstName + ' ' + attr2.lastName).toLowerCase();
          break;
        case 'creator':
          attr1 = (attr1.firstName + ' ' + attr1.lastName).toLowerCase();
          attr2 = (attr2.firstName + ' ' + attr2.lastName).toLowerCase();
          break;
        case 'title':
          attr1 = attr1.toLowerCase();
          attr2 = attr2.toLowerCase();
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
    const { currentUser, updateUser, history } = this.props;
    const { sortedBy } = this.state;
    return (
      <div className="table">
        <div className="table-header-group">
          <div 
            className="table-cell creator" 
            onClick={() => this.sortTicketsBy('creator')}
          >
            <div className="title">Creator</div>
            <div className="triangle">
              {sortedBy.attr !== 'creator' ? null : sortedBy.ord ? '▴' : '▾' }
            </div>
            </div><div className="handle 1">
          </div>
          <div 
            className="table-cell owner" 
            onClick={() => this.sortTicketsBy('owner')}
          >
            <div className="title">Owner</div>
            <div className="triangle">
              {sortedBy.attr !== 'owner' ? null : sortedBy.ord ? '▴' : '▾'}
            </div>
            </div><div className="handle 2">
          </div>
          <div 
            className="table-cell ticket-title" 
            onClick={() => this.sortTicketsBy('title')}
          >
            <div className="title">Title</div>
            <div className="triangle">
              {sortedBy.attr !== 'title' ? null : sortedBy.ord ? '▴' : '▾'}
            </div>
            </div><div className="handle 3">
          </div>
          <div 
            className="table-cell created-at" 
            onClick={() => this.sortTicketsBy('createdAt')}
          >
            <div className="title">Created At</div>
            <div className="triangle">
              {sortedBy.attr !== 'createdAt' ? null : sortedBy.ord ? '▴' : '▾'}
            </div>
            </div><div className="handle 4">
          </div>
          <div 
            className="table-cell updated-at" 
            onClick={() => this.sortTicketsBy('updatedAt')}
          >
            <div className="title">Updated At</div>
            <div className="triangle">
              {sortedBy.attr !== 'updatedAt' ? null : sortedBy.ord ? '▴' : '▾'}
            </div>
            </div><div className="handle 5">
          </div>
          <div 
            className="table-cell status" 
            onClick={() => this.sortTicketsBy('status')}
          >
            <div className="title">Status</div>
            <div className="triangle">
              {sortedBy.attr !== 'status' ? null : sortedBy.ord ? '▴' : '▾'}
            </div>
            </div><div className="handle 6">
          </div>
          <div 
            className="table-cell priority" 
            onClick={() => this.sortTicketsBy('priority')}
          >
            <div className="title">Priority</div>
            <div className="triangle">
              {sortedBy.attr !== 'priority' ? null : sortedBy.ord ? '▴' : '▾'}
            </div>
            </div><div className="handle 7">
          </div>
          <div 
            className="table-cell start-date" 
            onClick={() => this.sortTicketsBy('startDate')}
          >
            <div className="title">Start Date</div>
            <div className="triangle">
              {sortedBy.attr !== 'startDate' ? null : sortedBy.ord ? '▴' : '▾'}
            </div>
            </div><div className="handle 8">
          </div>
          <div 
            className="table-cell end-date" 
            onClick={() => this.sortTicketsBy('endDate')}
          >
            <div className="title">End Date</div>
            <div className="triangle">
              {sortedBy.attr !== 'endDate' ? null : sortedBy.ord ? '▴' : '▾'}
            </div>
            </div><div className="handle 9">
          </div>
          <div 
            className="table-cell starred"
          >
            <div className="title starred">Starred</div>
          </div>
        </div>
        <div className="table-row-group">
          {tickets.map(ticket => {
            return (
              <div key={ticket._id} onClick={() => this.state.resizing ? null : history.push(`/tickets/${ticket._id}`)}>
                <TicketIndexItem 
                  ticket={ticket} 
                  currentUser={currentUser}
                  starredIds={currentUser.starred}
                  updateUser={updateUser}
                />
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default TicketIndex
