import React, { Component } from 'react';
import { PlacesProvider } from '../__context/places';

import '../__assets/styles/icons.css';
import './App.css';

import Header from '../components/Header';
import Collaborate from '../pages/Collaborate';
import Footer from '../components/Footer';

class App extends Component {
    render() {
        //Usually I would use a router to switch pages in this component
        //but since the test only consistent of building one page, we will
        //just place that page component (Collaborate) inside and hardcode the links
        return (
            <>
                <Header />
                <PlacesProvider>
                    <Collaborate />
                </PlacesProvider>
                <Footer />
            </>
        );
    }
}

export default App;
