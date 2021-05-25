import React from 'react';
import { login } from '../../actions/session_actions';
// make sure correct import
import { Link } from 'react-router-dom';

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

    // componentWillUnmount() {
    //     this.props.clearErrors();
    // }

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
        // dispatch(login({ email: "demoUserEmail", username: "demoUsername", password: "demoPassword"}))
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
                <label> Email:
                    <input
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.update('email')}
                        className="login-input"
                    />
                </label>
            </>
        )
    }


    render() {
        let signUpNameForm
        if (this.props.formType === "Create Account") {
            signUpNameForm = this.signupForm();
        };

        return (
            <div>

                <div className="session-form-container">
                    <form onSubmit={this.handleSubmit} className="session-form-box">

                        <h1 className="login-signup-header">{this.props.headerType}</h1>

                        <div className="login-signup-errors">{this.renderErrors()}</div>

                        <div className="session-form">

                            {signUpNameForm}

                            <label> Username:
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.update('username')}
                                    className="login-input"
                                />
                            </label>

                            <label> Password:
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="login-input"
                                />
                            </label>

                            <p className="forgot-password" onClick={this.handleDemoSubmit}>Forgot your Password? Login as Demo User!</p>

                            <input
                                className="session-submit"
                                type="submit"
                                value={this.props.formType}
                            />
                            <br />
                            <p className="new-user">{this.props.formNav}</p>

                            <div>
                                <Link to={this.props.navLinkInRender}>
                                    <div className="session-submit">
                                        {this.props.NavText}
                                    </div>
                                </Link>
                            </div>

                            <button className="session-submit" onClick={this.handleDemoSubmit}>
                                Login as Demo User
                            </button>


                        </div>

                    </form>
                </div>








            </div>
        )


    }



}

export default SessionForm;