import React from 'react';
import { withRouter } from 'react-router-dom';
import '../app.css'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.clearErrors()
        this.props.signup(user)
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: ''
        });
    }


    render() {
        return (
            <div className="form-container">
                <form className="form">

                    <img className="cat-hat" src="https://i.pinimg.com/originals/cd/db/80/cddb8020bf0d4605c1e11fc6d97eaace.png"></img>
                    <input className="form-box-signup" type="text"
                        value={this.state.firstName}
                        onChange={this.update('firstName')}
                        placeholder={ this.props.errors.firstName ? this.props.errors.firstName : "firstName"}
                    />
                    <input className="form-box-signup" type="text"
                        value={this.state.lastName}
                        onChange={this.update('lastName')}
                        placeholder={this.props.errors.lastName ? this.props.errors.lastName : "lastName"}
                    />
                    <input className="form-box-signup" type="text"
                        value={this.state.email}
                        onChange={this.update('email')}
                        placeholder={this.props.errors.email ? this.props.errors.email : "email"}
                    />
                    <input className="form-box-signup" type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder={this.props.errors.password ? this.props.errors.password : "Password"}
                    />
                    <input className="form-box-signup" type="password"
                        value={this.state.password2}
                        onChange={this.update('password2')}
                        placeholder={this.props.errors.password2 ? this.props.errors.password2 : "Confirm Password"}
                    />
                    <button className="button1" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm)