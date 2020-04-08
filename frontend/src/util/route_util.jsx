import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => {
    return (
    <Route path={path} exact={exact} render={(props) => {
        
        if (!loggedIn) {
           return <Component {...props} />
        } else { 
            return <Redirect to="/tickets" />
        }
    } }/>
)};

const Protected = ({ component: Component, loggedIn, ...rest }) => {
    return (
    <Route
        {...rest}
        render={props => {
            if (!loggedIn) {
                return <Component {...props} />
             } else {
                return <Redirect to={`/tickets/owner/${rest.currentUser._id}`} />
            }
        }}
    />
)};

const mapStateToProps = state => {
    return {
     loggedIn: Boolean(state.session.isAuthenticated) ,
     user: state.entities.users,
     currentUser: state.entities.users[state.session._id]

    }
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
