import React from 'react';

import { connect } from 'react-redux';
import { openModal } from '../actions/modal_actions';


const Splash = ({ openModal }) => {

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.documentElement.scrollTop === 0) {
            document.getElementsByClassName("splash-main-nav")[0].className = "splash-main-nav";
        } else {
            document.getElementsByClassName("splash-main-nav")[0].className = "splash-main-nav splash-main-nav-scrolled";
        }
    }
    return (
        <div className="splash-container">
            <header className="splash-main-nav">
                <a href="/"><img className="splash-logo" src={window.ednaLogoRed} alt="logo"/></a>
                <nav className="splash-login-signup">
                    <button className="login-button" onClick={() => openModal('login')}>Log In</button>
                    <button className="signup-button" onClick={() => openModal('signup')}>Try for free</button>
                </nav>
            </header>

            <div className="splash-hero-content">
                <h1>The way you work isn't working</h1>
                <h3>Ditch the chaos of endless email, sprawling spreadsheets, and not-so-sticky notes. Edna is all you need to manage work—without the anxiety.</h3>
                <button className="hero-content-signup-button signup-button" onClick={() => openModal('signup')}>Try for free</button>
            </div>

            <div className="splash-section-1">
                <div className="splash-video">
                    <video src={window.splashVideo} autoPlay loop muted></video>
                </div>

                <div className="video-background">
                    <img src={window.videoBackground} alt=""/>
                </div>


                <div className="splash-video-text">
                    <div className="video-front-img">
                        <div className="video-left-person">
                            <img src={window.videoLeftPerson} alt="" />
                        </div>
                        <div className="video-right-person">
                            <img src={window.videoRightPerson} alt="" />
                        </div>
                    </div>
                    <div className="splash-video-textblocks">
                        <div className="splash-video-textblock block-1">
                            <p className="textblock-title">Get organized</p>
                            <p className="textblock-body">Plan and structure work in a way that’s best for you. Set priorities and deadlines. Share details and assign tasks. All in one place.</p>
                        </div>
                        <div className="splash-video-textblock block-2">
                            <p className="textblock-title">Stay on track</p>
                            <p className="textblock-body">Follow projects and tasks through every stage. You know where work stands and can keep everyone aligned on goals.</p>
                        </div>
                        <div className="splash-video-textblock block-3">
                            <p className="textblock-title">Hit deadlines</p>
                            <p className="textblock-body">Create visual project plans to see how every step maps out over time. Pinpoint risks. Eliminate roadblocks. Even when plans change.</p>
                        </div>
                    </div>
                </div>

            </div>

            <footer className="splash-footer">
                <div className="splash-footer-directory">
                </div>

                <div className="splash-footer-lang-links">
                    <a href="https://github.com/woojinc/" target="_blank">
                        <i className="fab fa-github-square"></i>
                    </a>
                    <a href="https://github.com/woojinc/" target="_blank">
                        <i className="fas fa-chalkboard"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/woojin-chae/" target="_blank">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </footer>

        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal)),
    };
};

export default connect(null, mapDispatchToProps)(Splash);