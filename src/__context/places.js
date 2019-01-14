import React, { Component } from 'react';

const PlacesContext = React.createContext();

export class PlacesProvider extends Component {
    state = {
        location: {}, //google places api will give us the city, state/prov, county and country separately
        setLocation: (location) => {
            this.setState({ location: location });
        }
    }

    render() {
        return (
            <PlacesContext.Provider value={this.state}>
                {this.props.children}
            </PlacesContext.Provider>
        )
    }
}

export const PlacesConsumer = PlacesContext.Consumer;