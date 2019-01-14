import React, { Component } from 'react';
import firebase from 'firebase';
import { PlacesConsumer } from '../../__context/places';
import __isEmpty from 'lodash/isEmpty';
import __upperFirst from 'lodash/upperFirst';
import __intersection from 'lodash/intersection';
import {
    locationRangeOptions,
    ideaBoxOptions,
    statusOptions,
    genderOptions,
    ageOptions
} from '../../__utils/options';

import './Collaborate.css';

import Select from 'react-select';
import PlacesInput from '../../components/PlacesInput';

require('firebase/firestore');

class Collaborate extends Component {
    db = null;

    state = {
        radius: -1,
        interests: [],
        formDistance: null,
        formDistanceMiles: null,
        formInterests: [],
        searchResultsOriginal: [], //keep original to avoid db calls when refining results after the search
        searchResultsRefined: [],
        refinements: []
    }
    
    async componentDidMount() {
        this.db = firebase.firestore();
        this.db.settings({ timestampsInSnapshots: true });

        //get interests from the db
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
        
        let newState = {
            [metaData.name]: value
        };

        if (metaData.name === 'formDistance') {
            newState['formDistanceMiles'] = selection.label;
        }

        this.setState(newState);
    }

    searchVloggers = async (e) => {
        e.preventDefault();

        if (this.state.formInterests.length === 0) {
            alert('Please add interests');
            return;
        }
        
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

        this.setState({ 
            searchResultsOriginal: searchResults,
            searchResultsRefined: searchResults,
            refinements: []
        });
    }

    refineSearch = (refinementType) => {
        const binded = this;

        return (selection, metaData) => {
            const originalResults = binded.state.searchResultsOriginal;
            const currentRefinements = binded.state.refinements;

            //if the same same filter type is clicked, remove so we can change the value
            let newRefinements = currentRefinements.filter((refinement) => {
                return refinement.type !== refinementType;
            });
            
            //add the new refinement if all isn't chosen
            if (selection.value !== 'all') {
                let refinementToPush = {
                    type: refinementType,
                    value: selection.value
                };
    
                if (selection.min) {
                    refinementToPush['min'] = selection.min;
                    refinementToPush['max'] = selection.max;
                }

                newRefinements.push(refinementToPush);
            }

            let refinedUsers = [];
            originalResults.forEach((user) => {
                let numTrueRefinements = 0;
                newRefinements.forEach((refinement) => {
                    if (refinement.type === 'age') {
                        const birthYear = new Date(user.birthday).getFullYear();
                        const nowYear = new Date().getFullYear();
                        const userAge = nowYear - birthYear;
                        
                        if (refinement.min <= userAge && userAge <= refinement.max) {
                            // refinedUsers.push(user);
                            numTrueRefinements += 1;
                        }
                    } else if (user[refinement.type] === refinement.value) {
                        numTrueRefinements += 1;
                    }
                });
                
                //need to meet all conditions for user to show in the results
                if (numTrueRefinements === newRefinements.length) {
                    refinedUsers.push(user);
                }
            });
    
            binded.setState({ 
                searchResultsRefined: refinedUsers,
                refinements: newRefinements
            });
        };
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

        const { location } = this.props;
        const locationString = `
            ${ location.city },&nbsp;
            ${ !__isEmpty(location.stateProv) ? location.stateProv + ',' : '' }&nbsp;
            ${location.country}
        `;
        const searchRadiusString = `${this.state.formDistanceMiles}le radius`;

        let interestsString = '';
        this.state.formInterests.forEach((interest, i) => {
            //don't add pipe and space if last interest
            if (i < this.state.formInterests.length - 1) {
                interestsString += `${__upperFirst(interest)} | `;
            } else {
                interestsString += __upperFirst(interest);
            }
        });

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
                                    options={locationRangeOptions}
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
                                    options={ideaBoxOptions} 
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
                        this.state.searchResultsRefined.length === 0 &&
                        <div className="no-results">
                            <h2>
                                Sorry, there are no results.
                                <br />
                                Please complete the search form or retry different parameters.
                            </h2>
                        </div>
                    }
                    {
                        this.state.searchResultsRefined.length > 0 &&
                        <div className="results-wrapper">
                            <div className="results-header">
                                <div className="results-header--left">
                                    <h2>{ this.state.searchResultsRefined.length } vloggers near { this.props.location.city }</h2>
                                    <div className="search-breakdown">
                                        <div dangerouslySetInnerHTML={{ __html: locationString }}></div>
                                        <div className="second-line">
                                            <div>{ searchRadiusString }</div>
                                            <div>{ interestsString }</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="refine-results-section">
                                    <h2>Refine Results</h2>
                                    <div className="refine-dropdowns">
                                        <Select 
                                            name="refineStatus" 
                                            options={statusOptions} 
                                            placeholder="Status"
                                            styles={selectStyles}
                                            onChange={this.refineSearch('onlineStatus')}
                                        />
                                        <Select 
                                            name="refineGender" 
                                            options={genderOptions} 
                                            placeholder="Gender"
                                            styles={selectStyles}
                                            onChange={this.refineSearch('gender')}
                                        />
                                        <Select 
                                            name="refineAge" 
                                            options={ageOptions} 
                                            placeholder="Age"
                                            styles={selectStyles}
                                            onChange={this.refineSearch('age')}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
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
