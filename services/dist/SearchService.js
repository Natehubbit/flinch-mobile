'use strict'
exports.__esModule = true
var algoliasearch_1 = require('algoliasearch')
// const searchClient = algoliasearch(
//   'B1G2GM9NG0',
//   'aadef574be1f9252bb48d4ea09b5cfe5'
// )
var SearchService = /** @class */ (function () {
  function SearchService() {}
  SearchService.getCeleb = function () {}
  SearchService.searchClient = algoliasearch_1[
    'default'
  ](
    'YQ0F8086LS',
    '388026844dc825c3cfeb902b6ab4ff4a'
  )
  return SearchService
})()
exports['default'] = SearchService
