'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _liskJs = require('lisk-js');

var _liskJs2 = _interopRequireDefault(_liskJs);

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _liskJs2.default.api(_config2.default.liskJS);