import { connect } from "react-redux"
import { fetchCreatedTickets} from "../../actions/ticket_actions"
import { fetchUserComments } from "../../actions/comment_actions"
import Profile from "./profile"
import {withRouter} from "react-router-dom"
import { getOneUser } from "../../actions/user_actions"

const mSTP = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.userId],
    comments: Object.values(state.entities.comments),
    tickets: Object.values(state.entities.tickets),
    loggedIn: state.session.isAuthenticated
})

const mDTP = (dispatch) => ({
    getOneUser: userId => dispatch(getOneUser(userId)),
    fetchCreatedTickets: (userId) => dispatch(fetchCreatedTickets(userId)),
    fetchUserComments: (userId) => dispatch(fetchUserComments(userId))
})

export default withRouter(connect(mSTP, mDTP)(Profile))