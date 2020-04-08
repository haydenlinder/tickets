import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import escapeRegexCharacters from '../../../util/regex_util';


class ticketOwner extends React.Component {
  constructor(props) {
    super(props);
    
    const languages = [
      { name: 'C' },
      { name: 'C#' },
      { name: 'C++' },
      { name: 'Clojure' }
    ];

    this.state = {
      value: '',
      suggestions: [],
      users: this.props.users,
      languages: languages
    };

 

    // bind autosuggest methods
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);


    // this.whatever = this.whatever.bind(this);
  }

  // autosuggest methods
  getSuggestions(value) {
    debugger
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') { return []; }
    const regex = new RegExp('^' + escapedValue, 'i');
    return this.props.users.filter(user => regex.test(user.firstName));
  };

  getSuggestionValue(suggestion) { 
    return suggestion.firstName; 
  };

  renderSuggestion(suggestion) { 
    return <span>{suggestion.firstName}</span>; 
  };

  componentDidMount() {
    // debugger
    this.props.getOrgUsersByHandle(this.props.orgHandle);
    this.setState({
      users: this.props.getOrgUsersByHandle(this.props.orgHandle)
    })
  }


  onChange = (event, { newValue }) => {
    debugger
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render = () => {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

    console.log("this.props.users = ");
    console.log(this.props.users);
    return (
      <div id="basic-example">
        <div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            id="basic-example"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ticketOwner);
