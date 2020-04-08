import {connect} from "react-redux"
import UserIndex from "./user_index"
import {getOrgUsersByHandle} from "../../actions/organization_actions"
import {withRouter} from "react-router-dom"

const mSTP = (state, ownProps) => ({
    users: Object.values(state.entities.organizations)
})

const mDTP = (dispatch) => ({
    getOrgUsersByHandle: (orgHandle) => dispatch(getOrgUsersByHandle(orgHandle)),
})

export default withRouter(connect(mSTP, mDTP)(UserIndex))