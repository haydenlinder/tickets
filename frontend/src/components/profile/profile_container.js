import { connect } from "react-redux"
import { fetchCreatedTickets} from "../../actions/ticket_actions"
import { fetchUserComments } from "../../actions/comment_actions"
import Profile from "./profile"
import { withRouter } from "react-router-dom"


const mSTP = (state, ownProps) => ({
    user: state.entities.users[ownProps.match.params.userId],
    comments: Object.values(state.entities.comments),
    tickets: Object.values(state.entities.tickets),
    loggedIn: state.session.isAuthenticated
    }
)

const mDTP = (dispatch) => ({
    fetchCreatedTickets: (userId) => dispatch(fetchCreatedTickets(userId)),
    fetchUserComments: (userId) => dispatch(fetchUserComments(userId))
})



export default connect(mSTP, mDTP)(Profile);