import { connect } from 'react-redux';
import {login, clearErrors} from '../../actions/session_actions';
import {getOneUser} from "../../actions/user_actions"
import LoginForm from './login_form';

const mapStateToProps = (state) => {
    return({
        users: Object.values(state.entities.users),
        currentUser: state.entities.users[state.session._id],
        errors: state.errors.session,
    })
};

const mapDispatchToProps = (dispatch) => ({
        login: user => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors()),
        getOneUser: (userId) => dispatch(getOneUser(userId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)