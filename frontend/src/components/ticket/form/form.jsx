import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from 'react-icons/fa';
import PrioritySelect from './priority_select';
import StatusSelect from './status_select';
import Star from './star';

const Form = ({ ticket, type, errors, currentUser, state, update, handleSubmit, updateUser, setState }) => (
    <form className="form">
        <div className="form-header">
            <span className="ticket-number">T{ticket._id} - </span>
            <CopyToClipboard text={window.location.href} onCopy={() => setState({ copied: true })}>
                <span className="copy">Copy Link <FaCopy /></span>
            </CopyToClipboard>
            {state.copied ? <span className="copied fade-out"> Copied to Clipboard!</span> : null}
        </div>
        <div className="ticket-errors">
            <p>{errors.title}</p>
        </div>
        <div className="title-star">
            <input
                className={`${type} title`}
                type="text"
                placeholder="title"
                value={state.title}
                onChange={update("title")}
            />
            <Star
                currentUser={currentUser}
                updateUser={updateUser}
                ticket={ticket}
            />
        </div>
        <div className="selectors">
            <label>Status
                <StatusSelect
                    type={type}
                    status={state.status}
                    update={update}
                />
            </label>
            <label>Owner
                <input
                    className={`${type} owner`}
                    type="text"
                    placeholder="owner"
                    value={state.owner}
                    onChange={update("owner")}
                />
            </label>
            <label>Priority
                                <PrioritySelect
                    type={type}
                    priority={state.priority}
                    update={update}
                />
            </label>
            <button
                onClick={handleSubmit}
                className="button1 not-edited"
                id="ticket-submit-button"
            >
                {type === "new" ? "Create" : "Save"}
            </button>
        </div>
        <div className="ticket-errors">
            <p>{errors.date}</p>
        </div>
        <div className="schedule">
            Start<br />Date
                            <input
                className={type}
                type="date"
                value={state.startDate}
                onChange={update("startDate")}
            />
                            End<br />Date
                            <input
                className={type}
                type="date"
                value={state.endDate}
                onChange={update("endDate")}
            />
        </div>
        <textarea
            className={`${type} body margin`}
            cols="30"
            rows="10"
            value={state.body}
            placeholder="body"
            onChange={update("body")}
        ></textarea>
        <label className="subs-title">
            subscribed
                        </label>
        <textarea
            className={`${type} subscribed margin`}
            value={state.subscribed}
            placeholder="subscribed"
            onChange={update("subscribed")}
        ></textarea>
        <input
            className={`${type} depends-on margin`}
            type="text"
            placeholder="depends on"
            onChange={update("dependsOn")}
        />
        <input
            className={`${type} blocks margin`}
            type="text"
            value={state.blocks}
            placeholder="blocks"
            onChange={update("blocks")}
        />
    </form>
);

export default Form;