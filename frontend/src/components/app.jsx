import React from 'react';
import { PublicRoute, AuthRoute, PrivateRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import NavBarContainer from './navbar/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import TicketContainer from './ticket/ticket_container';
import TicketIndex from './ticket_index/ticket_index';
import LeftPanelContainer from './left_panel/left_panel_container';
import UserIndexContainer from "./user_index/user_index_container"
import NotFound from './errors/not_found';

import './reset.css';
import './app.css';

const App = () => (
  <div>
    <NavBarContainer />
    <div className="app-container">
      <PrivateRoute path="/tickets" component={LeftPanelContainer} />
      <div className="page-container">
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <PublicRoute exact path="/login" component={LoginFormContainer} />
          <PublicRoute exact path="/signup" component={SignupFormContainer} />
          <PrivateRoute exact path="/users/:userId" component={ProfileContainer} />
          <PrivateRoute exact path="/tickets/search/" component={TicketIndex} />
          <PrivateRoute exact path="/tickets/:ticketId" component={TicketContainer} />
          <PrivateRoute exact path="/tickets/:folder/:userId" component={TicketIndex} />
          <PrivateRoute exact path="/users/search/:searchParams" component={UserIndexContainer} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </div>
);

export default App;

