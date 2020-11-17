"use strict";
exports.__esModule = true;
require("react-native-gesture-handler");
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var Navbar_1 = require("../../components/Navbar");
var Home_1 = require("../../screens/Home");
var Search_1 = require("../../screens/Search");
var Celeb_1 = require("../../screens/Celeb");
var Book_1 = require("../../screens/Book");
var PaymentMode_1 = require("../../screens/PaymentMode");
var PaymentCard_1 = require("../../screens/PaymentCard");
var PaymentMobile_1 = require("../../screens/PaymentMobile");
var Stack = stack_1.createStackNavigator();
var HomeStack = function () {
    var renderHeader = function (props) {
        var name = props.scene.route.name;
        var isHome = name === 'Home';
        var heading = isHome ? 'FLINCH' : name;
        if (name === 'Celeb') {
            isHome = false;
            heading = 'Celebrity';
        }
        if (name === 'PaymentCard' || name === 'PaymentMobile') {
            heading = 'Payment';
        }
        var showNav = !(name === 'Search');
        if (!showNav)
            return null;
        return react_1["default"].createElement(Navbar_1["default"], { isHome: isHome, title: heading });
    };
    return (react_1["default"].createElement(Stack.Navigator, { screenOptions: {
            header: function (props) { return renderHeader(props); }
        } },
        react_1["default"].createElement(Stack.Screen, { name: 'Home', component: Home_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Search', component: Search_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Celeb', component: Celeb_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Book', component: Book_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Payment', component: PaymentMode_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'PaymentCard', component: PaymentCard_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'PaymentMobile', component: PaymentMobile_1["default"] })));
};
exports["default"] = HomeStack;
