import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import isMobile from 'ismobilejs';
import escapeRegexCharacters from '../../util/regex_util';
import styles from './ticket_owner.less';


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

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => <span>{ suggestion.name }</span>;


class ticketOwner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };

    // this.whatever = this.whatever.bind(this);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
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

    return (
      <div id="basic-example" className={styles.container}>
        {/* <div className={styles.textContainer}>
          <div className={styles.title}>Basic</div>
          <div className={styles.description}>
            Let’s start simple. Here’s a plain list of suggestions.
          </div>
          <Link
            className={styles.codepenLink}
            href="http://codepen.io/moroshko/pen/LGNJMy"
            underline={false}
          >
            Codepen
          </Link>
        </div> */}
        <div className={styles.autosuggest}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            // focusInputOnSuggestionClick={focusInputOnSuggestionClick}
            id="basic-example"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(ticketOwner);
