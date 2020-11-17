"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_top_tabs_1 = require("@react-navigation/material-top-tabs");
var RequestsPending_1 = require("../../screens/RequestsPending");
var RequestsReviewed_1 = require("../../screens/RequestsReviewed");
var react_native_1 = require("react-native");
var theme_1 = require("../../config/theme");
var Tab = material_top_tabs_1.createMaterialTopTabNavigator();
function RequestsTabs() {
    return (react_1["default"].createElement(Tab.Navigator, { tabBarOptions: {
            style: styles.tab,
            labelStyle: styles.label,
            indicatorStyle: {
                backgroundColor: theme_1.theme.colors.accent
            }
        }, style: styles.tab },
        react_1["default"].createElement(Tab.Screen, { name: "Pending", component: RequestsPending_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { name: "Reviewed", component: RequestsReviewed_1["default"] })));
}
var styles = react_native_1.StyleSheet.create({
    tab: {
        elevation: 0
    },
    label: {
        textTransform: 'none',
        fontFamily: 'MontserratAlternates-Bold',
        fontSize: 15
    }
});
exports["default"] = RequestsTabs;
