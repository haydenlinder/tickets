import React from 'react'
import { Link } from 'react-router-dom';

class lastUpdateSeenBy extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collapsed: true
        };

    };

    handleClick(e) {
        this.setState({ collapsed: !this.state.collapsed });
    };

    getViewers() {
        const { ticket } = this.props;
        let { collapsed } = this.state;
        let numViewers = ticket.lastUpdateSeenBy.length;

        return(
            <span>
                {collapsed ?
                    <span>
                        {ticket.lastUpdateSeenBy.slice(0, 3).map((user, i) => 
                            <span key={user._id}><Link to={`/users/${user._id}`}>{user.firstName} {user.lastName}</Link>{i === numViewers - 1 ? null : ','} </span>
                        )}
                        {numViewers > 3 ? 
                            <span className='toggle-expand' onClick={() => this.handleClick()}>
                                + {numViewers - 3} more
                            </span> : null
                        }
                    </span> 
                :
                    <span>
                        {ticket.lastUpdateSeenBy.map((user, i) => 
                            <span><Link to={`/users/${user._id}`}>{user.firstName} {user.lastName}</Link>{i === numViewers - 1 ? null : ','} </span>
                        )}
                        <span className='toggle-expand' onClick={() => this.handleClick()}>
                            Show less
                        </span>
                    </span>
                }
            </span>
        )
    }

    render() { 
        return(
            <div className='lusb-container'>
                <span>Last update seen by {this.getViewers()} </span>
            </div>
        )
    }
}

export default lastUpdateSeenBy