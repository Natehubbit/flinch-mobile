'use strict'

function _toConsumableArray (arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread () { throw new TypeError('Invalid attempt to spread non-iterable instance') }

function _iterableToArray (iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]') return Array.from(iter) }

function _arrayWithoutHoles (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i] } return arr2 } }

const _require = require('metro-config')
const getDefaultConfig = _require.getDefaultConfig

module.exports = (function _callee () {
  let _ref, _ref$resolver, sourceExts, assetExts

  return regeneratorRuntime.async(function _callee$ (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2
          return regeneratorRuntime.awrap(getDefaultConfig())

        case 2:
          _ref = _context.sent
          _ref$resolver = _ref.resolver
          sourceExts = _ref$resolver.sourceExts
          assetExts = _ref$resolver.assetExts
          return _context.abrupt('return', {
            transformer: {
              babelTransformerPath: require.resolve('react-native-svg-transformer')
            },
            resolver: {
              assetExts: assetExts.filter(function (ext) {
                return ext !== 'svg'
              }),
              sourceExts: [].concat(_toConsumableArray(sourceExts), ['svg'])
            }
          })

        case 7:
        case 'end':
          return _context.stop()
      }
    }
  })
}())
