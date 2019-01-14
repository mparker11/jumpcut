import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlacesInput extends Component {
    googlePlacesScript = null;
    autocomplete = null;
    state = {
        value: ''
    };
    
    componentDidMount() {
        //load google places api JS
        this.googlePlacesScript = document.createElement('script');
        this.googlePlacesScript.type = 'text/javascript';

        //I would normally use a .env file for API keys 
        this.googlePlacesScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAkTDGzOP1r7m6uCubFs13qfRlFYtkLi-Y&libraries=places';
    
        document.head.appendChild(this.googlePlacesScript);

        this.googlePlacesScript.onload = () => {
            const placesField = document.querySelector('[name="google-places-field"]');
            // eslint-disable-next-line no-undef
            this.autocomplete = new google.maps.places.Autocomplete(placesField, {
                types: ['(cities)'] 
            });
        };
    }

    componentWillUnmount() {
        document.head.removeChild(this.googlePlacesScript);
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }
    
    render() {
        return (
            <input name="google-places-field" type="text" value={this.state.value} onChange={this.onChange} />
        );
    }
}

PlacesInput.propTypes = {
    radius: PropTypes.number.isRequired
}

export default PlacesInput;
