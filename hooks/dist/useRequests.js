'use strict'
exports.__esModule = true
exports.useRequests = void 0
const store_1 = require('../store')
exports.useRequests = function (key, val) {
  return store_1.useSelector(function (_a) {
    const requests = _a.requests
    if (key && val) {
      return requests.filter(function (d) { return d[key] === val })
    }
    return requests
  })
}
