'use strict'
exports.__esModule = true
exports.useUploadProgress = void 0
const store_1 = require('../store')
exports.useUploadProgress = function () {
  return store_1.useSelector(function (state) {
    return state.uploadProgress
  })
}
