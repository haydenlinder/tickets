import React from "react";

const ActivityIndexItem = (props) => {
  debugger
  return (
  <div>
    <div>
      {props.update.actor.firstName}{" "}
      {props.update.actor.lastName}{" "}
      updated the ticket at {props.update.time}
    </div>
  </div>
  )
};

export default ActivityIndexItem;
