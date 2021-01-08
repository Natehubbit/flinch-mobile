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
var react_1 = require("react");
var react_native_1 = require("react-native");
// import { FlatList } from 'react-native-gesture-handler'
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var styledComponents_1 = require("../../common/styledComponents");
var CelebImage_1 = require("../../components/CelebImage");
var SectionHeader_1 = require("../../components/SectionHeader");
var useCelebs_1 = require("../../hooks/useCelebs");
var useLoader_1 = require("../../hooks/useLoader");
// import { Celeb } from '../../services/CelebService'
var celebs_1 = require("../../store/celebs");
var Home = function () {
    var dispatch = react_redux_1.useDispatch();
    var celebs = useCelebs_1.useCelebs();
    var celebsLoader = useLoader_1.useLoader().celebsLoader;
    react_1.useEffect(function () {
        (celebs.length < 1) &&
            dispatch(celebs_1.celebsActions.getCelebs());
    }, []);
    if (celebsLoader) {
        return react_1["default"].createElement(react_native_paper_1.ActivityIndicator, { animating: true });
    }
    // const featured = celebs && celebs.slice(0, 4)
    // const renderFeatured = ({ item }:{item:Celeb}) => {
    //   return <CelebImage
    //       {...item}
    //     />
    // }
    var renderAll = function () {
        return celebs && celebs.map(function (celeb) { return (react_1["default"].createElement(CelebImage_1["default"], __assign({ key: celeb.id }, celeb, { large: true }))); });
    };
    // const featureView = () => {
    //   return (
    //     <>
    //       <SectionHeader title='Featured' />
    //       <FlatList
    //         data={featured}
    //         horizontal
    //         showsHorizontalScrollIndicator={false}
    //         renderItem={renderFeatured}
    //         contentContainerStyle={styles.section}
    //         keyExtractor={(item) => item.id}
    //       />
    //     </>
    //   )
    // }
    var allView = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(SectionHeader_1["default"], { title: 'Celebrities' }),
            react_1["default"].createElement(react_native_1.View, { style: styles.allSection }, renderAll())));
    };
    var renderViews = function (_a) {
        var item = _a.item;
        return item;
    };
    return react_1["default"].createElement(react_native_1.View, null,
        react_1["default"].createElement(styledComponents_1.AppContainer
        // data={[featureView(), allView()]}
        , { 
            // data={[featureView(), allView()]}
            data: [allView()], renderItem: renderViews, keyExtractor: function (item, index) { return index.toString(); } }));
};
var styles = react_native_1.StyleSheet.create({
    container: {},
    section: {
        paddingVertical: 15,
        flexDirection: 'row',
        height: styledComponents_1.maxHeight * 0.25,
        paddingLeft: 12
    },
    allSection: {
        paddingTop: 15,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 12
    }
});
exports["default"] = Home;
