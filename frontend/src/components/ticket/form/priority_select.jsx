import React from 'react';

const PrioritySelect = ({ priority, type, update }) => (
    <select
        className={`${type} priority`}
        defaultValue={priority}
        onChange={update('priority')}
    >
        <option
            value="Low"
        >
            Low
        </option>
        <option
            value="Medium"
        >
            Medium
        </option>
        <option
            value="High"
        >
            High
        </option>
        <option
            value="CATastrophic"
        >
            CATastrophic
        </option>
    </select>
);

export default PrioritySelect;