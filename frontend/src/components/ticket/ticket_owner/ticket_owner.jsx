import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import escapeRegexCharacters from '../../../util/regex_util';


const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'JavaScript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
];

// const getSuggestions = value => {
//   const escapedValue = escapeRegexCharacters(value.trim());

//   if (escapedValue === '') {
//     return [];
//   }

//   const regex = new RegExp('^' + escapedValue, 'i');

//   return bank.filter(language => regex.test(language.name));
// };

// const getSuggestionValue = suggestion => suggestion.name;

// const renderSuggestion = suggestion => <span>{ suggestion.name }</span>;


class ticketOwner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
      users: this.props.users,
      bank: languages
    };

    this.getSuggestions = value => {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    
    return this.state.bank.filter(language => regex.test(language.name));
  };

  this.getSuggestionValue = suggestion => suggestion.name;

  this.renderSuggestion = suggestion => <span>{ suggestion.name }</span>;

  this.getSuggestions = this.getSuggestions.bind(this);
  this.getSuggestionValue = this.getSuggestionValue.bind(this);
  this.renderSuggestion = this.renderSuggestion.bind(this);


    // this.whatever = this.whatever.bind(this);
  }

  componentDidMount() {
    // debugger
    this.props.getOrgUsersByHandle(this.props.orgHandle);
    this.setState({
      bank: this.props.users
    })
    debugger
    // in case of page refresh, fetch the current user to overwrite 
    // stale preloaded state from login and get updated starred list
    // this.props.getOrgUsersByHandle(this.props.orgHandle);
    // console.log("MARSHALL");
    // console.log(this.props.users);
    // this.setState({
    //   store: this.props.users.values
    // });
    // debugger
    // if (this.props.ticketId !== 'new') {
    //   this.props.getTicket(this.props.ticketId)
    //     .then(ticket => {

    //       this.props.ticket.startDate = (
    //         this.props.ticket.startDate ?
    //           this.props.ticket.startDate.slice(0, 10) : ''
    //       );

    //       this.props.ticket.endDate = (
    //         this.props.ticket.endDate ?
    //           this.props.ticket.endDate.slice(0, 10) : ''
    //       );

    //       this.setState(this.props.ticket);
    //     })
    //     .then(() => this.view());
    // }
  }

  onChange = (event, { newValue }) => {
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

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };
    // debugger
    // this.props.getOrgUsersByHandle(this.props.orgHandle);
    console.log("MARSHALL");
    console.log(this.props.users);
    // this.setState({
    //   store: this.props.users.values
    // });
    // debugger
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
