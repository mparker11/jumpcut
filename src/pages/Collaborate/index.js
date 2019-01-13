import React, { Component } from 'react';

import './Collaborate.css';

import PlacesInput from '../../components/PlacesInput';

class Collaborate extends Component {
    render() {
        return (
            <div className="page">
               <div className="hero">
                    <div className="hero-search-section">
                        <h1>Sed augue ipsum egestas</h1>
                        <h2>Curabitur nisi. Vivamus consectetuer hendrerit.</h2>
                        <div className="search-row">
                            <div className="search-group">
                                <PlacesInput />
                            </div>
                            <div className="search-group"></div>
                            <div className="search-group"></div>
                            <div className="search-group"></div>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}

export default Collaborate;
