const util = require('util');
const lisk = require('lisk-js');
const should = require('should');
const sinon = require('sinon');
const config = require('../config.json');

// See https://github.com/shouldjs/should.js/issues/41
Object.defineProperty(global, 'should', { value: should });
global.sinon = sinon;

process.env.NODE_ENV = 'test';

exports.lisk = lisk.api(config.liskJS);
exports.should = should;
exports.sinon = sinon;
exports.util = util;
// See https://github.com/shouldjs/should.js/issues/41
Object.defineProperty(exports, 'should', { value: should });
