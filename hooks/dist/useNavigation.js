"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useNavigation = function (_a) {
    var navRef = _a.navRef;
    var ref = react_1.useRef(navRef);
    react_1.useEffect(function () {
        console.log(ref.current);
    }, [ref]);
};
exports["default"] = useNavigation;
