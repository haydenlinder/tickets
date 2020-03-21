import React from "react"


class ActivityIndexItem extends React.Component{
    constructor(props) {
        super(props)

    }

    render() {
        debugger
        return (
          <div>
              {this.props.update.actor} updated the ticket at {this.props.update.time} 
          </div>
        );
    }
}


export default ActivityIndexItem