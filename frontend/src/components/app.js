import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

//FIXME: change to proper main componet after merge
import Main from './main/main';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';

const App = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    // <AuthRoute exact path="/" component={Main} />
    <AuthRoute exact path="/login" component={LoginFormContainer} />
    <AuthRoute exact path="/signup" component={SignupFormContainer} />
  </Switch>
);

export default App;
