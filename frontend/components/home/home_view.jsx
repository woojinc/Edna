import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import {
    AuthRoute,
    ProtectedRoute,
} from '../../util/route_util';

// import HomeViewContainer from './home_view_container';
import ProjectIndexContainer from '../projects/project_index_container';
import ProjectShowContainer from '../projects/proejct_show_container';

import Modal from '../modal/modal';
import GreetingContainer from '../greeting/greeting_container';
import LoginFormContainer from '../session_form/login_form_container';
import SgnupFormContainer from '../session_form/signup_form_container';

class Home extends React.Component {
    render() {
        return (
            <div className="home-page-view">
                <Switch>
                    <ProtectedRoute exact path="/home" component={ProjectIndexContainer} />
                    <ProtectedRoute exact path="/projects" component={ProjectIndexContainer} />
                    <ProtectedRoute exact path="/projects/:projectId" component={ProjectShowContainer} />
                </Switch>
            </div>
        );
    };
};

export default Home;