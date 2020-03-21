import React from 'react'
import {Link} from 'react-router-dom'

const CommentIndexItem = ({ comment }) => {
    return (
      <div>
        <div>{comment.body}</div>

        <Link to={`/users/${comment.author.id}`}>
          {comment.author.firstName} {comment.author.lastName}
        </Link>

        <div>{comment.time}</div>
      </div>
    );
} 

export default CommentIndexItem

