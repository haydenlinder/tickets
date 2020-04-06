import { connect } from 'react-redux';
import { logout, loginDemoUser, clearErrors } 
  from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

import NavBar from './navbar';

const mapStateToProps = (state, ownProps) => {
    return ({
        currentUser: state.entities.users[state.session._id],
        path: ownProps.location.pathname
    })
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    loginDemoUser: () => dispatch(loginDemoUser()),
    clearErrors: () => dispatch(clearErrors())
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar));
