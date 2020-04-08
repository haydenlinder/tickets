import React from 'react';

const Star = ({ currentUser, updateUser, ticket }) => {
    return ticket ? (
        <div
            className="star"
            onClick={(e) => {
                e.stopPropagation();
                let i = currentUser.starred.indexOf(ticket._id);
                if (i === -1) {
                    currentUser.starred.push(ticket._id);
                } else {
                    currentUser.starred.splice(i, 1);
                }
                updateUser(currentUser);
            }}
        >
            {currentUser.starred.includes(ticket._id) ? "★" : "☆"}
        </div>
    ) : null;
};

export default Star;