import React from 'react';

const StatusSelect = ({ type, status, update }) => (
    <select
        className={`${type} status`}
        defaultValue={status}
        onChange={update('status')}
    >
        <option
            value="No Progress"
            className="no-progress"
        >
            No Progress
        </option>

        <option
            value="Planned"
            className="planned"
        >
            Planned
        </option>

        <option
            value="Blocked"
            className="blocked"
        >
            Blocked
        </option>

        <option
            value="In Progress"
            className="in-progress"
        >
            In Progress
        </option>

        <option
            value="Closed"
            className="closed"
        >
            Closed
        </option>
    </select>
);

export default StatusSelect;
