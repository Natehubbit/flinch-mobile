'use strict'
exports.__esModule = true
exports.useRequests = void 0
var store_1 = require('../store')
exports.useRequests = function (key, val) {
  return store_1.useSelector(function (_a) {
    var requests = _a.requests
    if (key && val) {
      var data = requests.filter(function (d) {
        return d[key] === val
      })
      return data
    }
    return requests
  })
}
