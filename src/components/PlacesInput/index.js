import React, { Component } from 'react';
import PropTypes from 'prop-types';
import __find from 'lodash/find';
import { PlacesConsumer } from '../../__context/places';

class PlacesInput extends Component {
    googlePlacesScript = null;
    autocomplete = null;
    
    componentDidMount() {
        //load google places api JS
        this.googlePlacesScript = document.createElement('script');
        this.googlePlacesScript.type = 'text/javascript';

        //I would normally use a .env file for API keys 
        this.googlePlacesScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAkTDGzOP1r7m6uCubFs13qfRlFYtkLi-Y&libraries=places';
    
        document.head.appendChild(this.googlePlacesScript);

        this.googlePlacesScript.onload = () => {
            const placesField = document.querySelector('[name="googlePlacesField"]');
            // eslint-disable-next-line no-undef
            this.autocomplete = new google.maps.places.Autocomplete(placesField, {
                types: ['(cities)'] 
            });

            // eslint-disable-next-line no-undef
            google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
                const place = this.autocomplete.getPlace();

                //weed through google api jibberish to format a 
                //more readable return object with the city, stateProv and country
                const city = __find(place.address_components, (component) => {
                    return component.types.includes('locality');
                });

                const stateProv = __find(place.address_components, (component) => {
                    return component.types.includes('administrative_area_level_1');
                });

                const country = __find(place.address_components, (component) => {
                    return component.types.includes('country');
                });

                const formattedPlace = {
                    city: city.long_name,
                    stateProv: stateProv.long_name,
                    country: country.long_name
                };

                this.props.setGlobalLocation(formattedPlace);
            });
        };
    }

    componentWillUnmount() {
        document.head.removeChild(this.googlePlacesScript);
    }
    
    render() {
        //we are leaving the text input uncontrolled (no inner state) because the google
        //places api will take over. thus, we are saving the state globally using the context api.
        //this way, our parent component can receive the updates also.
        return (
            <input 
                type="text" 
                name="googlePlacesField" 
                onChange={this.onChange} 
            />
        );
    }
}

PlacesInput.propTypes = {
    radius: PropTypes.number.isRequired
}

export default (props) => {
    return (
        <PlacesConsumer>{
            ({setLocation}) => {
                return <PlacesInput {...props} setGlobalLocation={setLocation} />
            }
        }</PlacesConsumer>
    )
}
