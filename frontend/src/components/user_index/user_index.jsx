import React from "react"
import UserIndexItem from "./user_index_item"
import {withRouter} from "react-router-dom"


class UserIndex extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
       let queryString = this.props.location.search
       let params = new URLSearchParams(queryString)
       let nameFragment = params.get('namefragment')
       this.props.getOrgUsersByHandleAndNameFragment(this.props.currentUser.orgHandle, nameFragment) 
       debugger
    }


    render() {
        if(!this.props.users) return null
        if(!this.props.location.search) return null
        
        return (
            <div>
                <p></p>
                <UserIndexItem 
                    users={this.props.users}
                />
            </div>
        )
    }
}


export default withRouter(UserIndex)