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
        this.demoLogin = this.demoLogin.bind(this);
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

    demoLogin(e) {
        e.preventDefault();
        const demoUser = {
            email: "user1@user.com",
            password: "password"
        };
        this.props.processDemoLogin(demoUser)
    }

    renderErrors() {
        return (
            <ul className="errors">
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    session_login_form() {

    }

    render() {
        return (
            <div>
                <form className="login-form-container" onSubmit={this.handleSubmit}>
                    <button 
                        className="close-button" 
                        type="button" 
                        onClick={this.props.closeModal}>    
                            <i className="fas fa-times"></i>
                    </button>
                    <h1 className="login-header-text">{this.props.formType}</h1>
                    {this.renderErrors()}
                    <div className="login-form">
                        <label>
                            Email Address
                            <br />
                            <input 
                                type="email"
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
                        <br />
                        <button 
                            className="login-demo-submit" 
                            type="button" 
                            onClick={this.demoLogin}>Demo</button>
                        <div className="forgot-password">
                            <a href="">Forgot password?</a>
                        </div>
                        <div className="redirect-to-signup">
                            <span>{ this.props.otherForm }</span>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;
