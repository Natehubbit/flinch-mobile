"use strict";
exports.__esModule = true;
exports.transaction = exports.batch = exports.storage = exports.db = exports.auth = void 0;
// import '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
// import storageRef from '@react-native-firebase/storage';
var firebase = require("firebase");
require("firebase/firestore");
require("firebase/storage");
var firebaseConfig = {
    apiKey: 'AIzaSyBTGE_5_pMDsiocYexxVvpUAl4bd4mD7yc',
    authDomain: 'shoutouts-3c57c.firebaseapp.com',
    databaseURL: 'https://shoutouts-3c57c.firebaseio.com',
    projectId: 'shoutouts-3c57c',
    storageBucket: 'shoutouts-3c57c.appspot.com',
    messagingSenderId: '431061869764',
    appId: '1:431061869764:web:6c472b4732feee74e11591',
    measurementId: 'G-5TW8YCZ8LD'
};
firebase.initializeApp(firebaseConfig);
exports.auth = firebase.auth();
exports.db = firebase.firestore();
exports.storage = firebase.storage();
exports.batch = firebase.firestore().batch;
exports.transaction = firebase.firestore().runTransaction;
