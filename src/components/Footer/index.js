/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="wrapper">
                    <div className="footer-left">&copy; { new Date().getFullYear() } Jumpcut</div>
                    <div className="footer-right">
                        <a href="#">Refund Policy</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Earnings Disclaimer</a>
                        <a href="#">Testimonial Disclosure</a>
                        <a href="#">Affiliate Disclosure</a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
