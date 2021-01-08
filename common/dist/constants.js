"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.OCCASIONS = exports.PROFILE_FORM = exports.VIDEO_SAVES = exports.THUMBS_PATH = exports.REQUEST_VIDEO_PATH = exports.initStateRequest = exports.PAYMENT_OPTIONS = exports.SLIDE_ANIMATION = exports.PAYMENT_CALLBACK = exports.RECORD_DURATION = exports.API = void 0;
var stack_1 = require("@react-navigation/stack");
exports.API = 'http://localhost:5001/shoutouts-3c57c/us-central1/';
exports.RECORD_DURATION = 60; // seconds
exports.PAYMENT_CALLBACK = 'https://us-central1-shoutouts-3c57c.cloudfunctions.net/paymentCallback';
exports.SLIDE_ANIMATION = __assign({}, stack_1.TransitionPresets.SlideFromRightIOS);
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
        timestamp: 0,
        thumbnailUri: ''
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
exports.THUMBS_PATH = 'thumbnails/';
exports.VIDEO_SAVES = 'FlinchSaves';
exports.PROFILE_FORM = [
    {
        type: 'name',
        left: 'account',
        placeholder: 'Name',
        right: ''
    },
    {
        type: 'email',
        left: 'email',
        placeholder: 'Email',
        right: ''
    },
    {
        type: 'password',
        left: 'lock',
        placeholder: 'Password',
        right: 'eye'
    }
];
exports.OCCASIONS = [
    'Birthday',
    'Wedding',
    'Advice',
    'Anniversary',
    'Gift',
    'Motivation'
];
