
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import TicketFormContainer from './tickets/ticket_form_container';
// import activity_ticket_index_container from './tickets/activity_ticket_index_container';
import TicketActivityIndexContainer from './tickets/ticket_activity_index_container';
import CommentFormContainer from './comments/comment_form_container'
import NotFound from './errors/not_found';
import './reset.css'
import './app.css'




const App = () => (
    <div>
        <NavBarContainer />
        
        <div className="app-container">
            <div className="page-container">
            <Switch>
                <AuthRoute exact path="/" component={MainPage} />
                <AuthRoute exact path="/login" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer} />
                <ProtectedRoute exact path="/users/:userId" component={ProfileContainer} />
                <ProtectedRoute exact path="/tickets/:ticketId" component={TicketFormContainer} />
                <ProtectedRoute exact path="/tickets/:ticketId" component={CommentFormContainer} />
                <ProtectedRoute exact path="/tickets/:ticketId"  component={TicketActivityIndexContainer}/>
                <Route component={NotFound} />
            </Switch>
            </div>
        </div>

    </div>
);

export default App;