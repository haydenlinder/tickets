import React from 'react';
import { withRouter } from "react-router-dom";
import CommentsAndActivity from './comments_and_activity/comments_and_activity';
import Form from './form/form';
import '../app.css';
import './ticket.css';

class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            loading: this.props.ticketId === 'new' ? false : true,
            ticket: this.props.ticket ?
                this.props.ticket 
            :
            {
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
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillUnmount() {
        this.props.clearTicketErrors();
    };

    componentDidMount() {
        // in case of page refresh, fetch the current user to overwrite 
        // stale preloaded state from login and get updated starred list
        this.props.getOneUser(this.props.currentUser._id)
        if (this.props.ticketId !== 'new') {
            this.props.getTicket(this.props.ticketId)
            .then(ticket => {
                // format date to play nice with input type="date"
                this.props.ticket.startDate = (
                    this.props.ticket.startDate ? 
                    this.props.ticket.startDate.slice(0,10) : ''
                );
                this.props.ticket.endDate = (
                    this.props.ticket.endDate ?
                    this.props.ticket.endDate.slice(0,10) : ''
                );   
                this.setState({ ticket: this.props.ticket, loading: false });
            })
            .then(() => this.view());
        };
    };

    componentDidUpdate(prevProps) {
        // clear fields when switching to new ticket
        if (this.props.ticketId !== prevProps.ticketId
            && this.props.ticketId === 'new') {
            this.setState({
                ticket: {
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
                }
            });
        };
    };

    view() {
        let viewerIds = this.props.ticket.lastUpdateSeenBy.map(viewer => viewer._id);
        if (!viewerIds.includes(this.props.currentUser._id)) {
            this.props.ticket.lastUpdateSeenBy.push(this.props.currentUser._id);
            this.props.updateTicket(this.props.ticket);
        };
    };

    handleSubmit(e) {
        e.preventDefault();
        if (e.target.classList.contains('not-edited')) return null;
        this.state.ticket.updatedAt.unshift(Date.now());
        this.state.ticket.updatedBy.unshift(this.props.currentUser._id);
        this.setState({ ticket: this.state.ticket });
        
        this.props.clearTicketErrors();
        
        if (this.props.ticketId !== "new") {
            this.props.updateTicket(this.state.ticket);
        } else {
            this.props.createTicket(this.state.ticket)
            .then(res => {
                if (res.errors) return null;
                this.setState({ ticket: res.ticket });
                this.props.history.push(`${res.ticket._id}`);
            })
            .catch(err => console.log(err));
        };
        let edits = document.getElementsByClassName('edited');
        
        for (let i = 0; i < edits.length; i++) {
            edits[i].classList.add('not-edited')
        };
        for (let i = 0; i <= edits.length; i++) {
            edits[0].classList.remove('edited')
        };
    };

    update(field) {
        return e => {
            // eslint-disable-next-line
            this.state.ticket[field] = e.currentTarget.value
            this.setState({ ticket: this.state.ticket });
            e.currentTarget.classList.add('edited');
            let button = document.getElementById('ticket-submit-button');
            button.classList.remove('not-edited')
            button.classList.add('edited')
        };
    };

    render() {
        const type = this.props.ticketId === 'new' ? 'new' : 'show';
        if (type!== 'new') {
            if (!this.props.ticket || this.state.loading) return null;
        }
        const { currentUser, updateUser, ticket, errors } = this.props;
        this.update = this.update.bind(this);
        debugger
        return (
            <div className="outer-container">
                <div className="form-and-activity-container">
                    <Form 
                        ticket={ticket}
                        type={type}
                        errors={errors}
                        currentUser={currentUser}
                        updateUser={updateUser}
                        state={this.state}
                        setState={this.setState.bind(this)}
                        update={this.update}
                        handleSubmit={this.handleSubmit}
                    />
                    <CommentsAndActivity 
                        ticket={ticket} 
                        type={type} 
                        currentUser={currentUser} 
                    />
                </div>
            </div>
        );         
    };
};

export default withRouter(Ticket);