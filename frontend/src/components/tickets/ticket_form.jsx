import React from 'react';
import TicketActivityContainer from "./ticket_activity_container"
import CommentFormContainer from "../comments/comment_form_container"
import LastUpdateSeenBy from './last_update_seen_by'
import {withRouter} from "react-router-dom"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { FaCopy } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import '../app.css'
import './ticket_form.css'

class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updatedAt: [],
            tags: [],
            subscribed: [this.props.currentUser._id],
            owner: this.props.currentUser._id,
            title: '',
            body: '',
            lastUpdateSeenBy: [],
            updatedBy: [],
            status: 'No Progress',
            priority: 'Low', 
            dependsOn: [],
            blocks: [],
            startDate: '',
            endDate: '',
            creator: this.props.currentUser._id,
            clipboardText: window.location.href,
            copied: false

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillUnmount() {
        this.props.clearTicketErrors()
    }

    componentDidMount() {
        // in case of page refresh, fetch the current user to overwrite 
        // stale preloaded state from login and get updated starred list
        this.props.getOneUser(this.props.currentUser._id)
        if (this.props.ticketId !== 'new') {
            this.props.getTicket(this.props.ticketId)
            .then(ticket => {
                
                this.props.ticket.startDate = (
                    this.props.ticket.startDate ? 
                    this.props.ticket.startDate.slice(0,10) : ''
                )

                this.props.ticket.endDate = (
                    this.props.ticket.endDate ?
                    this.props.ticket.endDate.slice(0,10) : ''
                )

                this.setState(this.props.ticket)
            })
            .then(() => this.view());
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.ticketId !== prevProps.ticketId
            && this.props.ticketId === 'new') {
            this.setState({
                updatedAt: [],
                tags: [],
                subscribed: [this.props.currentUser._id],
                owner: this.props.currentUser._id,
                title: '',
                body: '',
                lastUpdateSeenBy: [],
                updatedBy: [],
                status: 'No Progress',
                priority: 'Low',
                dependsOn: [],
                blocks: [],
                startDate: '',
                endDate: '',
                creator: this.props.currentUser._id
            });
        }
    }

    view() {
        let viewerIds = this.props.ticket.lastUpdateSeenBy.map(viewer => viewer._id);
        if (!viewerIds.includes(this.props.currentUser._id)) {
            this.props.ticket.lastUpdateSeenBy.push(this.props.currentUser._id);
            this.props.updateTicket(this.props.ticket);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (e.target.classList.contains('not-edited')) return null
        this.state.updatedAt.unshift(Date.now());
        this.state.updatedBy.unshift(this.props.currentUser._id)
        this.setState({lastUpdateSeenBy: []})
        
        this.props.clearTicketErrors()
        
        if (this.props.ticketId !== "new") {
            this.props.updateTicket(this.state)
        } else {
            this.props.createTicket(this.state)
            .then(res => {
                if (res.errors) return null 
                this.setState(res.ticket)
                this.props.history.push(`${res.ticket._id}`)
            })
            .catch(err => console.log(err))
        }
        let edits = document.getElementsByClassName('edited')
        
        for (let i = 0; i < edits.length; i++) {
            edits[i].classList.add('not-edited')
        }
        for (let i = 0; i <= edits.length; i++) {
            edits[0].classList.remove('edited')
        }
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value });
            e.currentTarget.classList.add('edited');
            let button = document.getElementById('ticket-submit-button');
            button.classList.remove('not-edited')
            button.classList.add('edited')
        };
    }

    render(){

        if (this.props.ticketId !== 'new') {
            if (!this.props.ticket) return null;
        }

        let type = this.props.ticketId === 'new' ? 'new' : 'show';

        const statusSelect = (
            <select 
                className={`${type} status`}
                defaultValue={this.state.status}
                onChange={this.update('status')}
            >
                <option 
                    value="No Progress"
                    className="no-progress"
                >
                    No Progress
                </option>

                <option 
                    value="Planned"
                    className="planned"
                >
                    Planned
                </option>

                <option 
                    value="Blocked"
                    className="blocked"
                >
                    Blocked
                </option>

                <option 
                    value="In Progress"
                    className="in-progress"
                >
                    In Progress
                </option>

                <option 
                    value="Closed"
                    className="closed"
                >
                    Closed
                </option>
            </select>

        )

        const prioritySelect = (
            <select 
                className={`${type} priority`}
                defaultValue={this.state.priority} 
                onChange={this.update('priority')}
            >
                <option 
                    value="Low"
                >
                    Low
                </option>

                <option 
                    value="Medium"
                >
                    Medium
                </option>

                <option 
                    value="High"
                >
                    High
                </option>

                <option 
                    value="CATastrophic"
                >
                    CATastrophic
                </option>

            </select>
        )

        
        let star = this.props.ticket ? (
        <div
            className="star"
            onClick={(e) => {
                e.stopPropagation();
                let i = this.props.currentUser.starred.indexOf(this.props.ticket._id);
                if (i === -1) {
                    this.props.currentUser.starred.push(this.props.ticket._id);
                } else {
                    this.props.currentUser.starred.splice(i, 1);
                }
                this.props.updateUser(this.props.currentUser);
            }}
        >
            {this.props.currentUser.starred.includes(this.props.ticket._id) ? "★" : "☆"}
        </div> 
        ) : null
        
        
        return (
        <div className="outer-container">

            <div className="form-and-activity-container">
              <form className="form">

                {this.props.ticketId !== "new"
                    ? <div>
                            <CopyToClipboard text={this.state.clipboardText} onCopy={() => this.setState({ copied: true })}>
                                    <button>T{this.props.match.params.ticketId} - Copy Link to Clipboard <FaCopy /></button>
                            </CopyToClipboard>
                            {this.state.copied ? <span style={{ color: "red" }}> Copied to Clipboard!</span> : null}
                        </div>
                    : null}

              <div className="ticket-errors">
                <p>{this.props.errors.title}</p>
              </div>

                <div className="title-star">
                    <input
                        className={`${type} title`}
                        type="text"
                        placeholder="title"
                        value={this.state.title}
                        onChange={this.update("title")}
                    />

                    {this.props.ticket ? star : null}
                </div>

                <div className="selectors">
                    <label>Status
                        {statusSelect}
                    </label>

                    <label>Owner
                        <input
                            className={`${type} owner`}
                            type="text"
                            placeholder="owner"
                            value={this.state.owner}
                            onChange={this.update("owner")}
                        />
                    </label>

                    <label>Priority
                        {prioritySelect}
                    </label>

                    <button
                        onClick={this.handleSubmit}
                        className="button1 not-edited"
                        id="ticket-submit-button"
                    >

                        {this.props.ticketId === "new" ? "Create" : "Save"}
                    </button>
                </div>

                <div className="ticket-errors">
                    <p>{this.props.errors.date}</p>
                </div>

                <div className="schedule">
                    Start<br/>Date
                    <input
                        className={type}
                        type="date"
                        value={this.state.startDate}
                        onChange={this.update("startDate")}
                    />
                    End<br/>Date
                    <input
                        className={type}
                        type="date"
                        value={this.state.endDate}
                        onChange={this.update("endDate")}
                    />
                </div>

                <textarea
                  className={`${type} margin`}
                  cols="30"
                  rows="10"
                  value={this.state.body}
                  placeholder="body"
                  onChange={this.update("body")}
                ></textarea>
                <label className="subs-title">
                    subscribed
                </label> 
                <textarea
                    className={`${type} margin subscribed`}
                    value={this.state.subscribed}
                    placeholder="subscribed"
                    onChange={this.update("subscribed")}
                ></textarea>

                <input
                  className={`${type} margin`}
                  type="text"
                  placeholder="depends on"
                  onChange={this.update("dependsOn")}
                />

                <input
                  className={`${type} margin`}
                  type="text"
                  value={this.state.blocks}
                  placeholder="blocks"
                  onChange={this.update("blocks")}
                />


              </form>

                {this.props.ticketId !== "new" ? (
                <ul className="activity-container">
                    <div className="activity-header">
                        <h1 className="title">Comments and activity</h1>
                        <LastUpdateSeenBy ticket={this.props.ticket}/>
                    </div>
                    <CommentFormContainer />
                    <TicketActivityContainer currentUser={this.props.currentUser}/>
                </ul>
                ) : null}

            </div>

        </div>
        );        
        
    }

}

export default withRouter(TicketForm);