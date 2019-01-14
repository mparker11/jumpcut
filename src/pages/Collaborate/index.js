import React, { Component } from 'react';
import firebase from 'firebase';

import './Collaborate.css';

import Select from 'react-select';
import PlacesInput from '../../components/PlacesInput';

require('firebase/firestore');

class Collaborate extends Component {
    state = {
        radius: -1,
        interests: []
    }
    
    locationRangeOptions = [
        { value: -1, label: 'Anywhere' },
        { value: 8046.72, label: '5 mi' },
        { value: 24140.2, label: '15 mi' },
        { value: 80467.2, label: '50 mi' }
    ]

    //these won't do anything becauase there is
    //no correlation in the design between "Italian Cuisine"
    //and the search results
    ideaBoxOptions = [
        { value: '', label: 'Italian Cuisine' },
        { value: '', label: 'Random String' },
        { value: '', label: 'No String?' }
    ];

    async componentDidMount() {
        let db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true });

        const interestSnapshot = await db.collection('interests').get();
        let interests = [];
        interestSnapshot.forEach((doc) => {
            //using the model, return valid <select /> option objects
            interests.push({
                value: doc.data().name,
                label: doc.data().name
            });
        });

        this.setState({ interests: interests });
    }

    searchVloggers = (e) => {
        e.preventDefault();
        console.log(e);
    }
    
    render() {
        const selectStyles = {
            valueContainer: (base) => ({
                ...base,
                padding: '0 0 0 1.375em'
            }),
            placeholder: (base) => ({
                ...base,
                fontSize: '20px'
            }),
            input: (provided, state) => ({
                padding: '0.75em 2.5em',
                fontSize: '20px',
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '3px'
            }),
            indicatorSeparator: () => ({
                display: 'none'
            }),
            control: (base) => ({
                ...base,
                cursor: 'pointer'
            })
        };

        return (
            <div className="page">
               <div className="hero">
                    <div className="hero-search-section">
                        <h1>Sed augue ipsum egestas</h1>
                        <h2>Curabitur nisi. Vivamus consectetuer hendrerit.</h2>
                        <form className="search-form" onSubmit={this.searchVloggers}>
                            <div className="search-group">
                                <PlacesInput radius={this.state.radius} />
                                <Select 
                                    name="location-radius" 
                                    options={this.locationRangeOptions}
                                    placeholder="Distance"
                                    styles={selectStyles}
                                />
                            </div>
                            <div className="search-group">
                                <Select 
                                    name="interests-field"
                                    isMulti
                                    options={this.state.interests}
                                    placeholder="What are your interests?"
                                    styles={selectStyles}
                                />
                            </div>
                            <div className="search-group">
                                <Select 
                                    name="extra-search-options" 
                                    options={this.ideaBoxOptions} 
                                    placeholder="What else are you searching?"
                                    styles={selectStyles}
                                />
                            </div>
                            <div className="search-group">
                                <input type="submit" value="Search" />
                            </div>
                        </form>
                    </div>
               </div>
            </div>
        );
    }
}

export default Collaborate;
