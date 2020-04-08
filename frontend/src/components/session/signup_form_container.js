import { connect } from 'react-redux';
import {withRouter} from "react-router-dom"
import { signup, clearErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = (state, ownProps) => {
    return {
        signedIn: state.session.isSignedIn,
        errors: state.errors.session,
        currentUser: state.entities.users[state.session._id],
        history: ownProps.history
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: user => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors()), 
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupForm))