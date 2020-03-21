import React from "react"
import {Link} from "react-router-dom"
import CommentFormContainer from "../comments/comment_form_container"
import TicketFormContainer from "./ticket_form_container"


class ActivityIndexItem extends React.Component{
    constructor(props) {
        super(props)

    }

    render() {
        return (
          <div>
              {this.props.update.actor} updated the ticket at {this.props.update.time} 
          </div>
        );
    }
}


export default ActivityIndexItem