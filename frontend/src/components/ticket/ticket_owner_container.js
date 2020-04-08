import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOrgUsersByHandle, getOrgUsersByHandleAndNameFragment }
  from '../../actions/organization_actions';
import ticketOwner from './ticket_owner/ticket_owner';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session._id],
  orgHandle: state.session.orgHandle,
  path: ownProps.location.pathname
});

const mapDispatchToProps = dispatch => ({
  getOrgUsersByHandle: orgHandle => dispatch(getOrgUsersByHandle(orgHandle)),
  getOrgUsersByHandleAndNameFragment: (orgHandle, nameFragment) => 
    dispatch(getOrgUsersByHandleAndNameFragment(orgHandle, nameFragment)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ticketOwner)
);
