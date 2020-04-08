import React from 'react';
import { withRouter } from 'react-router-dom';

class TicketQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {}
        };
    };

    update(field) {
        return e => {
            // eslint-disable-next-line
            this.state.query[field] = e.target.value;
            this.setState({ query: this.state.query });
        };
    };

    handleSubmit(e) {
        e.preventDefault();
        let queryString;
        this.props.history.push(`/tickets/?${queryString}`)
    };

    render() {
        const { query } = this.state;
        return(
            <div className="query-container">
                <div className="label">
                    Priority
                </div>
                <input 
                    type="text"
                    onChange={(e) => this.update('priority')}
                    value={query.priority}
                />
                <button 
                    className="button1"
                    onClick={(e) => this.handleSubmit(e)}
                >Search</button>
            </div>
        );
    };
};

TicketQuery = withRouter(TicketQuery);
export default TicketQuery; 