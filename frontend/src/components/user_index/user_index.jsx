import React from "react"
import UserIndexItem from "./user_index_item"


class UserIndex extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getOrgUsersByHandle(this.props.match.params.orgHandle)
    }

    render() {
        if(!this.props.users) return null

        return (
            <div>
                <UserIndexItem 
                    users={this.props.users}
                />
            </div>
        )
    }
}


export default UserIndex