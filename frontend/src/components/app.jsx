import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import NavBarContainer from './navbar/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import TicketContainer from './ticket/ticket_container';
import TicketIndex from './ticket_index/ticket_index';
import LeftPanelContainer from './left_panel/left_panel_container';
import NotFound from './errors/not_found';

import './reset.css';
import './app.css';

const App = () => (
    <div>
        <NavBarContainer />
        
        <div className="app-container">
            <ProtectedRoute path="/tickets" component={LeftPanelContainer} />
            <div className="page-container">
            <Switch>
                <AuthRoute exact path="/" component={MainPage} />
                <AuthRoute exact path="/login" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer} />
                <ProtectedRoute exact path="/users/:userId" component={ProfileContainer} />
                <ProtectedRoute exact path="/tickets/:ticketId" component={TicketContainer} />
                <ProtectedRoute exact path="/tickets/:folder/:userId" component={TicketIndex} />
                <Route component={NotFound} />
            </Switch>
            </div>
        </div>

    </div>
);

export default App;