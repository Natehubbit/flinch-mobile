"use strict";
exports.__esModule = true;
exports.FormService = void 0;
var FormService = /** @class */ (function () {
    function FormService() {
    }
    FormService.validateEmail = function (mail) {
        try {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    };
    return FormService;
}());
exports.FormService = FormService;
