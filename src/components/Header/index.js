import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
    openNotifications = () => {
        
    }

    openMessages = () => {
        
    }
    
    openProfileMenu = () => {
        
    }
    
    render() {
        return (
            <header>
                <div className="inner-header">
                    <div className="left-header">
                        <a className="logo" href="/">
                            <img alt="Jumpcut" src="https://jumpcut.com/img/jumpcut-homepage/logo.svg" />
                        </a>
                        <a href="/">My Courses</a>
                        <a href="/">Community</a>
                        <a href="/">Video Review</a>
                        <a href="/">Bootcamp</a>
                        <a className="active" href="/">Collaborate</a>
                    </div>
                    <div className="right-header">
                        <button onClick={this.openNotifications}>
                            <i className="icon-bell-o"></i>
                        </button>
                        <button onClick={this.openMessages}>
                            <i className="icon-comment-o"></i>
                        </button>
                        <button onClick={this.openProfileMenu}>
                            <div className="profile-image">
                                <i className="icon-user"></i>
                            </div>
                            <span>MP</span>
                            <i className="icon-caret-down"></i>
                        </button>
                        <div className="mobile-menu-icon">
                            <i className="icon-bars"></i>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
