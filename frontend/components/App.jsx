import React from 'react';
import { 
    Switch, 
    Route,
} from 'react-router-dom';
import { 
    AuthRoute,
    ProtectedRoute,
} from '../util/route_util';

import Modal from './modal/modal';
import Splash from './splash';
import Home from './home/home_container';
import GreetingContainer from './greeting/greeting_container';
import LoginFormContainer from './session_form/login_form_container';
import SgnupFormContainer from './session_form/signup_form_container';

const App = () => {
    return (
        <div>
            <Modal />
            <AuthRoute exact path="/" component={ Splash } />
            <ProtectedRoute path="/home" component={ Home } />
            {/* <header> */}
                {/* <h1>Edna E Mode App</h1> */}
                {/* <GreetingContainer /> */}
            {/* </header> */}
            {/* <Switch> */}
                {/* <AuthRoute path="/login" component={LoginFormContainer} /> */}
                {/* <AuthRoute path="/signup" component={SgnupFormContainer} /> */}
            {/* </Switch> */}
        </div>
    )
};

export default App;