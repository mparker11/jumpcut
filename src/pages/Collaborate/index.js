import React, { Component } from 'react';
import firebase from 'firebase';
import { PlacesConsumer } from '../../__context/places';

import './Collaborate.css';

import Select from 'react-select';
import PlacesInput from '../../components/PlacesInput';

require('firebase/firestore');

class Collaborate extends Component {
    db = null;

    state = {
        radius: -1,
        interests: [],
        formDistance: '',
        formInterests: [],
        searchResults: []
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
        this.db = firebase.firestore();
        this.db.settings({ timestampsInSnapshots: true });

        const interestSnapshot = await this.db.collection('interests').get();
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

    selectOption = (selection, metaData) => {
        let value = null;

        if (Array.isArray(selection)) {
            value = [];
            selection.forEach((obj) => {
                value.push(obj.value);
            });
        } else {
            value = selection.value;
        }
        
        this.setState({ [metaData.name]: value });
    }

    searchVloggers = async (e) => {
        e.preventDefault();
        
        //build the query
        let query = this.db.collection('users')
            .where('country', '==', this.props.location.country)
            .where('stateProv', '==', this.props.location.stateProv)
            .where('city', '==', this.props.location.city);

        const usersSnapshot = await query.get();
        const users = [];
        
        usersSnapshot.forEach((doc) => {
            users.push(doc.data());
        });

        //filter by interests - firebase has a limitation on querying by multiple values
        const searchResults = users.filter((user) => {
            return user.interests.some((interest) => this.state.formInterests.includes(interest));
        });

        this.setState({ searchResults: searchResults });
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
                                    name="formDistance" 
                                    options={this.locationRangeOptions}
                                    placeholder="Distance"
                                    styles={selectStyles}
                                    onChange={this.selectOption}
                                />
                            </div>
                            <div className="search-group">
                                <Select 
                                    name="formInterests"
                                    isMulti
                                    options={this.state.interests}
                                    placeholder="What are your interests?"
                                    styles={selectStyles}
                                    onChange={this.selectOption}
                                />
                            </div>
                            <div className="search-group">
                                <Select 
                                    name="formOtherStuff" 
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
                <div className="search-results-section">
                    {
                        this.state.searchResults.length > 0 &&
                        <p>{this.state.searchResults.length} vloggers near {this.props.location.city}</p>
                    }
                </div>
            </div>
        );
    }
}

export default (props) => {
    return (
        <PlacesConsumer>{
            ({location}) => {
                return <Collaborate {...props} location={location} />
            }
        }</PlacesConsumer>
    )
}
