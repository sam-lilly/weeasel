import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

//FIXME: change to proper main componet after merge
// import Main from './main/main';
import SplashPage from './splash/splash';
import LoginFormContainer from './session_form/login_form_container';
import SignupFormContainer from './session_form/signup_form_container';
import DrawingBoardIndexContainer from './drawing_boards/drawing_board_index_container';
import DrawingBoardShowContainer from './drawing_boards/drawing_board_show_container';
import NavBar from './nav_bar/nav_bar';
import Footer from './footer/footer';
import Home from './home/home';


const App = () => (
  <div>

    <NavBar />

    <Switch>

      {/* <Route exact path="/" component={Main} /> */}
      {/* // <AuthRoute exact path="/" component={Main} /> */}

      <Route exact path="/" component={SplashPage} />
      // <AuthRoute exact path="/" component={SplashPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />


      <Route exact path="/drawingBoards" component={DrawingBoardIndexContainer} />
      <Route exact path="/drawingBoards/:DrawingBoardId" component={DrawingBoardShowContainer} />

      <Route exact path="/home" component={Home} />
      {/* make this an auth route */}

    </Switch>

    <Footer />

  </div>


);

export default App;
