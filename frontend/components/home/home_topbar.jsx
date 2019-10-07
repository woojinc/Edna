import React from 'react';
import {
    Route,
    Link,
} from 'react-router-dom';
import {
    ProtectedRoute,
} from '../../util/route_util';


class HomeTopbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        };
        // this.onClick = this.onClick.bind(this);
        this.handleShowMenu = this.handleShowMenu.bind(this);
        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleShowPlusMenu = this.handleShowPlusMenu.bind(this);
        this.handleClosePlusMenu = this.handleClosePlusMenu.bind(this);
        this.handleShowActionMenu = this.handleShowActionMenu.bind(this);
        this.handleCloseActionMenu = this.handleCloseActionMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleShowMenu(e) {
        e.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.handleCloseMenu);
        });
    }

    handleCloseMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.handleCloseMenu);
        });
    }

    handleShowPlusMenu(e) {
        e.preventDefault();
        this.setState({ showPlusMenu: true }, () => {
            document.addEventListener('click', this.handleClosePlusMenu);
        });
    }

    handleClosePlusMenu() {
        this.setState({ showPlusMenu: false }, () => {
            document.removeEventListener('click', this.handleClosePlusMenu);
        });
    }

    handleShowActionMenu(e) {
        e.preventDefault();
        this.setState({ showActionMenu: true }, () => {
            document.addEventListener('click', this.handleCloseActionMenu);
        });
    }

    handleCloseActionMenu() {
        this.setState({ showActionMenu: false }, () => {
            document.removeEventListener('click', this.handleCloseActionMenu);
        });
    }

    handleLogout() {
        const { logout } = this.props;
        logout();
    }

    render() {
        const { 
            root, 
            id, 
            projectTitle,
            openModal } = this.props;
        let topHeaderTitle = "";
        if (projectTitle) {
            topHeaderTitle = projectTitle;
        } else if ( root === "home" ) {
            topHeaderTitle = "Home";
        } else if ( root === "projects" ) {
            topHeaderTitle = "Projects" ;
        }

        const profileMenu = this.state.showMenu ? (
                <div className="top-bar-menu">
                    <div className="menu-status coming-soon"></div>
                    <div className="menu-workspace coming-soon"></div>
                    <div className="menu-profile" onClick={this.handleLogout}>
                        <div>Log Out</div>
                    </div>
                </div>
            ) : (
                null
            );

        const plusMenu = this.state.showPlusMenu ? (
            <div className="top-bar-plus-menu">
                <span className="caret"></span>
                <div className="menu-task coming-soon"></div>
                <Link to="/projects/new" className="menu-project">
                    <div><i className="far fa-clipboard"></i>Project</div>
                </Link>
                <div className="menu-conversation coming-soon"></div>
                <div className="menu-invite coming-soon"></div>
            </div>
            ) : (
                null
            );

        const actionMenu = this.state.showActionMenu ? (
            <div className="top-bar-action-menu">
                <div 
                    className="edit-project" 
                    onClick={() => openModal('editProject')}>
                    <i className="far fa-edit"></i> Edit project details
                </div>
                <div 
                    className="delete-project" 
                    onClick={() => openModal('deleteProject')}>
                    Delete Project
                </div>
            </div>
            ) : (
                null
            );

        const actionMenuContainer = projectTitle ? (
            <div className="home-view-top-bar-action-menu-button">
                <i className="fas fa-angle-down" onClick={this.handleShowActionMenu}></i>
                { actionMenu }
            </div>
        ) : (
            null
        )
        return (
            <div className="home-view-top-bar">
                <div className="home-view-top-bar-title">
                    { topHeaderTitle } { actionMenuContainer }
                </div>
                <div className="home-view-top-bar-right"> 
                    <button className="top-bar-plus-menu-button" onClick={this.handleShowPlusMenu}>
                        <i className="fas fa-plus"></i>
                        { plusMenu }
                    </button>
                    <button className="top-bar-profile-menu-button" onClick={this.handleShowMenu}>
                        <i className="fas fa-mask"></i>
                        { profileMenu }
                    </button>
                </div>
            </div>
        );
    };
};

export default HomeTopbar;