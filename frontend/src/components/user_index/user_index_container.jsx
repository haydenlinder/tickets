import {connect} from "react-redux"
import UserIndex from "./user_index"
import {getOrgUsersByHandleAndNameFragment} from "../../actions/organization_actions"
import {withRouter} from "react-router-dom"

const mSTP = (state, ownProps) => ({
    users: Object.values(state.entities.organizations),
    currentUser: state.entities.users[state.session._id]
})

const mDTP = (dispatch) => ({
      getOrgUsersByHandleAndNameFragment: (orgHandle, nameFragment) =>
    dispatch(getOrgUsersByHandleAndNameFragment(orgHandle, nameFragment)),
})

export default withRouter(connect(mSTP, mDTP)(UserIndex))