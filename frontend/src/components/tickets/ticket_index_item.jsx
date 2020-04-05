import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const TicketIndexItem = ({ ticket, history, currentUser, starredIds, updateUser }) => {
    ticket.owner = ticket.owner ? ticket.owner : ""
    return (
        <div className="table-row ticket-index-item" >
            <div className='table-cell creator'> <Link onClick={e => e.stopPropagation()} to={`/users/${ticket.creator._id}`}>{ticket.creator.firstName} {ticket.creator.lastName}</Link> </div><div className="handle 1" onClick={e => e.stopPropagation()}></div>
            <div className='table-cell owner'>{ticket.owner ? <Link onClick={e => e.stopPropagation()} to={`/users/${ticket.owner._id}`}>{ticket.owner.firstName + ' ' + ticket.owner.lastName}</Link> : '--'}</div><div className="handle 2" onClick={e => e.stopPropagation()}></div>
            <div className="table-cell title">{ticket.title}</div><div className="handle 3" onClick={e => e.stopPropagation()}></div>
            <div className="table-cell created-at">{ticket.createdAt.date}</div><div className="handle 4" onClick={e => e.stopPropagation()}></div>
            <div className="table-cell updated-at">{ticket.updatedAt[0] ? ticket.updatedAt[0] : '--'}</div><div className="handle 5" onClick={e => e.stopPropagation()}></div>
            <div className="table-cell status">{ticket.status ? ticket.status : '--'}</div><div className="handle 6" onClick={e => e.stopPropagation()}></div>
            <div className="table-cell priority">{ticket.priority ? ticket.priority : '--'}</div><div className="handle 7" onClick={e => e.stopPropagation()}></div>
            <div className="table-cell start-date">{ticket.startDate ? ticket.startDate : '--'}</div><div className="handle 8" onClick={e => e.stopPropagation()}></div>
            <div className="table-cell end-date">{ticket.endDate ? ticket.endDate : '--'}</div><div className="handle 9" onClick={e => e.stopPropagation()}></div>
            <div className="table-cell starred">  
                <div 
                    className="star"
                    onClick={(e) => {
                        e.stopPropagation();
                        let i = starredIds.indexOf(ticket._id);
                        if (i === -1) {
                            currentUser.starred.push(ticket._id);
                        } else {
                            currentUser.starred.splice(i, 1);
                        }
                        updateUser(currentUser);
                    }} 
                >
                    { starredIds.includes(ticket._id) ? "★" : "☆" }
                </div> 
            </div>
        </div>
    )
}

export default withRouter(TicketIndexItem)