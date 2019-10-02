import React from 'react';
import { merge } from 'lodash';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field) {
        return e => {
            this.setState({
                [field]: e.target.value
            });
        };
    }

    handleSubmit(e){
        e.preventDefault();
        const user = merge({}, this.state);
        this.props.processForm(user);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <form className="login-form-container" onSubmit={this.handleSubmit}>
                    {this.renderErrors()}
                    <h3 className="login-header-text">Log In</h3>
                    <div className="login-form">
                        <label>
                            Email Address
                            <br />
                            <input 
                                type="text"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                className="login-input"
                            />
                        </label>
                        <br />
                        <label>
                            Password
                            <br />
                            <input 
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                className="login-input"
                            />
                        </label>
                        <br />
                        <input 
                            className="login-submit"
                            type="submit"
                            value={this.props.formType}
                            />
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;
