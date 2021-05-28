import React from 'react';
import { login } from '../../actions/session_actions';
// make sure correct import
import { Link } from 'react-router-dom';
import '../scss/styles.scss';
import weeasel from '../../logo/weeasel_use.png';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state)
        this.props.processForm(user);
    }

    handleDemoSubmit(e) {
        e.preventDefault();
        this.props.login({ email: "bobross@weeasel.com", username: "bobross", password: "password"})
    }

    renderErrors() {
        const { errors } = this.props;
        return (
            <ul>
                {
                    errors.map((error, idx) => (
                        <li key={`error-${idx}`}>
                            {error}
                        </li>
                    ))
                }
            </ul>
        )
    }


    signupForm() {
        return (
            <>
                {/* <label> Username:
                    <input
                        type="text"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.update('username')}
                        className="login-input"
                    />
                </label> */}
                {/* <label> Email: */}
                <input
                    type="text"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.update('email')}
                    className="login-input"
                />
                {/* </label> */}
            </>
        )
    }


    render() {
        let signUpNameForm
        if (this.props.formType === "create account") {
            signUpNameForm = this.signupForm();
        };

        return (
            <div>

                <div className="session-form-container">

                    <div className="left-side">
                        <Link to="/login" className="weeasel-logo-login">
                            <img className="logo" src={weeasel} alt="weeasel" />
                            <h1 className="weeasel">weeasel.</h1>
                        </Link>
                    </div>

                    <div>

                        <form onSubmit={this.handleSubmit} className="session-form-box">

                            <p className="login-signup-header">{this.props.headerType}</p>

                            <div className="login-signup-errors">{this.renderErrors()}</div>

                            <div className="session-form">

                                {signUpNameForm}

                                <input
                                    type="text"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.update('username')}
                                    className="login-input"
                                />

                                <input
                                    type="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="login-input"
                                />


                                <input
                                    className="session-submit"
                                    type="submit"
                                    value={this.props.formType}
                                />
                                <br />
                                <p className="new-user">{this.props.formNav}</p>

                                <p className="button-at-bottom">{this.props.navLink}</p>

                                <button className="session-submit" onClick={this.handleDemoSubmit}>
                                    login as demo user
                                </button>


                            </div>

                        </form>
                    </div>


                </div>








            </div>
        )


    }



}

export default SessionForm;