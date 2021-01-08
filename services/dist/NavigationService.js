"use strict";
exports.__esModule = true;
var NavigationService = /** @class */ (function () {
    function NavigationService() {
    }
    NavigationService.setRef = function (ref) {
        this.navRef = ref;
    };
    NavigationService.reset = function (route) {
        this.navRef.reset({
            index: 0,
            routes: [{ name: route }]
        });
    };
    NavigationService.navRef = null;
    return NavigationService;
}());
exports["default"] = NavigationService;
