import React from 'react';
import {
    Link,
    Switch,
    Route,
} from 'react-router-dom';
import {
    AuthRoute,
    ProtectedRoute,
} from '../../util/route_util';

import HomeViewContainer from './home_view_container';
import HomeTopbarContainer from './home_topbar_container';

import Modal from '../modal/modal';
import GreetingContainer from '../greeting/greeting_container';
import LoginFormContainer from '../session_form/login_form_container';
import SgnupFormContainer from '../session_form/signup_form_container';

class Home extends React.Component {
    render() {
        return (
            <div className="home-main">
                <div className="home-side-bar">
                    <div className="side-bar-header">
                        <div className="side-bar-logo">
                                <img className="side-bar-logo-img" src={window.ednaLogoWhite} alt="logo" />
                        </div>
                    </div>
                    <div className="side-bar-nav-link">
                            <Link to={{
                                pathname: "/home",
                                state: {
                                    goingTo: 'Home'
                                }
                            }}>
                                <div className="nav-link-home">
                                    <i className="fas fa-home"></i> Home
                                </div>
                            </Link>
                            <Link to={{
                                pathname: "/projects",
                                state: {
                                    goingTo: 'Projects'
                                }
                            }}>
                                <div className="nav-link-projects">
                                    <i className="far fa-clipboard"></i> My Projects
                                </div>
                            </Link>
                    </div>
                    <div className="side-bar-content">
                        <div className="side-bar-favorite coming-soon">side-bar-favorite</div>
                        <div className="side-bar-reports coming-soon">side-bar-reports</div>
                        <div className="side-bar-workspaces coming-soon">side-bar-workspaces</div>
                        <div className="side-bar-teamlists coming-soon">side-bar-teamlists</div>
                        <div className="side-bar-invite coming-soon">side-bar-invite</div>
                    </div>

                    <footer className="footer">

                        <div className="footer-links">
                            <a href="https://github.com/woojinc/" target="_blank">
                                <i className="fab fa-github-square"></i>
                            </a>
                            <a href="https://woojinchae.com/" target="_blank">
                                {/* <i className="fas fa-chalkboard"></i> */}
                                <img className="footer-logo-img" src={window.wjLogo} alt="logo" />
                            </a>
                            <a href="https://angel.co/woojin-chae" target="_blank">
                                <i className="fab fa-angellist"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/woojin-chae/" target="_blank">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </footer>
                </div>

                <div className="home-view">
                    <div className="home-view-top">
                        <Switch>
                            <ProtectedRoute exact path="/:root" component={ HomeTopbarContainer } />
                            <ProtectedRoute exact path="/:root/:id" component={ HomeTopbarContainer } />
                        </Switch>
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