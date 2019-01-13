import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDXiLqXzB7AnA_0wMZp5PSl0Y9GqYjXliI",
    authDomain: "jumpcut-interview.firebaseapp.com",
    databaseURL: "https://jumpcut-interview.firebaseio.com",
    projectId: "jumpcut-interview",
    storageBucket: "jumpcut-interview.appspot.com",
    messagingSenderId: "691619433397"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
