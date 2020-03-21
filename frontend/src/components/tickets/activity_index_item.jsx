import React from "react"
import {Link} from "react-router-dom"
import CommentForm from "../comments/comment_form"


class ActivityIndexItem extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        // const {ticket} = this.props

        // let updateInfo = [];
        // let updateObj = {
        //     time: "",
        //     firstName: "",
        //     lastName: ""
        // };
        //    for(let i = 0; i < timeUpdate.length; i += 1) {
        //             let time = timeUpdate[i];
        //             updateObj[time] = time;
        //             let user = ticket.updatedBy[i];
        //             updateObj[firstName] = user.firstName;
        //             updateObj[lastName] = user.LastName;

        //             updateInfo.push(updateObj)
        //    }

        // let updates = updateInfo.map(info =>  
        //     <div>
        //         <span> {info.time} </span>
        //         <Link to={`/user/${user.id}`} > {info.firstName} {info.lastName}</Link> 
        //     </div> 
        //     )


        // ticketComments = ticket.comments.map(comment => <p> {comment.body} </p> )
        // userCommentLink = ticket.comments.author.map(user => <Link to={`/user/${user.id}`}> {user.firstName} {user.lastName} </Link>)

        return (
          <div>
            <label> Updates:
                    {/* {updates} */}
            </label>
            <label> Comments:
                {/* <p> {ticketComments} {userCommentLink} </p> */}
            </label>

            <CommentForm />

          </div>
        );
    }
}


export default ActivityIndexItem