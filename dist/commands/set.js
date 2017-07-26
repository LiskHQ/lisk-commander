'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = setCommand;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setCommand(vorpal) {
	function setJSON(value) {
		_config2.default.json = value;
		_fsExtra2.default.writeFileSync('config.json', JSON.stringify(_config2.default, null, 2), 'utf8');
		return { message: 'successfully set json output to ' + value };
	}

	function setTestnet(value) {
		_config2.default.liskJS.testnet = value === 'true';
		_fsExtra2.default.writeFileSync('config.json', JSON.stringify(_config2.default, null, 2), 'utf8');
		return { message: 'successfully set testnet to ' + value };
	}

	vorpal.command('set <variable> <value>').description('Set configuration <variable> to <value>').action(function (userInput, callback) {
		var getType = {
			json: setJSON,
			testnet: setTestnet
		};

		var returnValue = getType[userInput.variable](userInput.value);

		return callback && typeof callback === 'function' ? callback(returnValue.message) : returnValue.message;
	});
}