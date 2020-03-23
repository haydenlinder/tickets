import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import './left_panel.css'

const LeftPanel = ({ userId }) => (
    <div className="left-panel-container">
        <h1 className="folders">Folders</h1>
        <Link to={`/tickets/owner/${userId}`}>Owner</Link>
        <Link to={`/tickets/subscribed/${userId}`}>Subscriber</Link>
        <Link to={`/tickets/creator/${userId}`}>Creator</Link>
        <Link to={`/tickets/starred/${userId}`}>Starred</Link>
    </div>
)

const msp = state => ({
    userId: state.session.user
})

const LeftPanelContainer = connect(msp, null)(LeftPanel);
export default LeftPanelContainer;