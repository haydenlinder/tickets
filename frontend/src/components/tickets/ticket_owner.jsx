import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import escapeRegexCharacters from '../../util/regex_util';

class ticketOwner extends React.Component {
  constructor(props) {
    super(props);

    // this.whatever = this.whatever.bind(this);
  }

  render() {
    return <div className="marshall-test"> <h1> CATS CATS CATS CATS </h1> </div>
  }
}

export default withRouter(ticketOwner);
