import React from "react"


class ActivityIndexItem extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const {ticket} = this.props

        // firstAndLast = ticket.updatedBy.map(user => 
        //     <span>
        //         {user.firstName}
        //         {user.lastName}
        //     </span>
        // )

        // tags = ticket.tags.map(tag =>
        //     <span>
        //         {tag}
        //     </span>
        // )



        return (
            <div>
               {/* <p> Updated at: {ticket.updatedAt} {firstAndLast}</p>
               <p>{tags}</p> */}
            </div>
        )
    }
}


export default ActivityIndexItem