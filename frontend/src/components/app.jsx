
import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const NoMatch = ({ location }) => (
  <div>
    <h3>
        oops! page not found check your routing
      <img src="https://worldcatcomedy.com/wp-content/uploads/2018/11/maxresdefault-62.jpg"/>
      {/* No match for <code>{location.pathname}</code> */}
    </h3>
  </div>
);

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route component={NoMatch}/>
    </Switch>
  </div>
);

export default App;