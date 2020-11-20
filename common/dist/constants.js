"use strict";
exports.__esModule = true;
exports.REQUEST_VIDEO_PATH = exports.initStateRequest = exports.PAYMENT_OPTIONS = exports.PAYMENT_CALLBACK = exports.RECORD_DURATION = exports.API = void 0;
exports.API = 'http://localhost:5001/shoutouts-3c57c/us-central1/';
exports.RECORD_DURATION = 60; // seconds
exports.PAYMENT_CALLBACK = 'https://us-central1-shoutouts-3c57c.cloudfunctions.net/paymentCallback';
exports.PAYMENT_OPTIONS = [
    {
        label: 'Mobile Money',
        icon: 'cellphone'
    },
    {
        label: 'Credit Card',
        icon: 'credit-card-outline'
    }
];
exports.initStateRequest = {
    id: '',
    celebrity: {
        id: '',
        name: ''
    },
    response: {
        status: 'pending',
        duration: 0,
        videoUri: '',
        timestamp: 0
    },
    instructions: '',
    occasion: '',
    recipient: '',
    requestor: {
        id: '',
        name: ''
    },
    status: 'pending',
    price: 0,
    timestamp: 0,
    payment: {
        id: '',
        amount: 0,
        payed: false,
        timestamp: 0
    }
};
// PATHS
exports.REQUEST_VIDEO_PATH = 'request/';
