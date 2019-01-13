import React, { Component } from 'react';

import '../__assets/styles/icons.css';
import './App.css';

import Header from '../components/Header';
import Collaborate from '../pages/Collaborate';

class App extends Component {
    render() {
        //Usually I would use a router to switch pages in this component
        //but since the test only consistent of building one page, we will
        //just place that page component (Collaborate) inside and hardcode the links
        return (
            <>
                <Header />
                <Collaborate />
                <footer></footer>
            </>
        );
    }
}

export default App;
