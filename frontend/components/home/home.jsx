import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import {
    AuthRoute,
    ProtectedRoute,
} from '../../util/route_util';

import HomeViewContainer from './home_view_container';

import Modal from '../modal/modal';
import GreetingContainer from '../greeting/greeting_container';
import LoginFormContainer from '../session_form/login_form_container';
import SgnupFormContainer from '../session_form/signup_form_container';

class Home extends React.Component {
    render() {
        return (
            <div className="home-main">
                <div className="home-side-bar">
                    <div className="side-bar-header">[Logo] nav-bar-link</div>
                    <div className="side-bar-nav-link">nav-bar-link</div>
                    <div className="side-bar-content">
                        <div className="side-bar-favorite">side-bar-favorite</div>
                        <div className="side-bar-reports">side-bar-reports</div>
                        <div className="side-bar-teamlists">side-bar-teamlists</div>
                        <div className="side-bar-invite">side-bar-invite</div>
                    </div>
                </div>

                <div className="home-view">
                    <div className="home-view-top">
                        <div className="home-view-top-bar">Top Bar</div>
                    </div>

                    <div className="home-page-view-container">
                        <HomeViewContainer />
                    </div>
                </div>



                {/* <AuthRoute exact path="/" component={Splash} /> */}
                {/* <ProtectedRoute path="/home" component={Home} /> */}
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
    }
};

export default Home;