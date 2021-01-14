'use strict'
exports.__esModule = true
exports.useDownloads = void 0
var store_1 = require('../store')
exports.useDownloads = function () {
  return store_1.useSelector(function (state) {
    return state.downloads
  })
}
