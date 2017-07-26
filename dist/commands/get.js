'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getCommand;

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _tablify = require('../utils/tablify');

var _tablify2 = _interopRequireDefault(_tablify);

var _query = require('../utils/query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCommand(vorpal) {
	function switchType(type) {
		return {
			account: 'account',
			address: 'address',
			block: 'block',
			delegate: 'delegate',
			transaction: 'transaction'
		}[type];
	}

	vorpal.command('get <type> <input>').option('-j, --json', 'Sets output to json').option('--no-json', 'Default: sets output to text. You can change this in the config.js').description('Get information from <type> with parameter <input>. \n Types available: account, address, block, delegate, transaction \n E.g. get delegate lightcurve \n e.g. get block 5510510593472232540').autocomplete(['account', 'address', 'block', 'delegate', 'transaction']).action(function (userInput) {
		var getType = {
			account: _query2.default.isAccountQuery.bind(_query2.default),
			address: _query2.default.isAccountQuery.bind(_query2.default),
			block: _query2.default.isBlockQuery.bind(_query2.default),
			delegate: _query2.default.isDelegateQuery.bind(_query2.default),
			transaction: _query2.default.isTransactionQuery.bind(_query2.default)
		};

		var output = getType[userInput.type](userInput.input);

		var shouldUseJsonOutput = (userInput.options.json === true || _config2.default.json === true) && userInput.options.json !== false;

		if (shouldUseJsonOutput) {
			return output.then(function (result) {
				if (result.error) {
					vorpal.log(JSON.stringify(result));
					return result;
				}
				vorpal.log(JSON.stringify(result[switchType(userInput.type)]));
				return result[switchType(userInput.type)];
			});
		}
		return output.then(function (result) {
			if (result.error) {
				vorpal.log((0, _tablify2.default)(result).toString());
				return result;
			}
			vorpal.log((0, _tablify2.default)(result[switchType(userInput.type)]).toString());
			return result[switchType(userInput.type)];
		});
	});
}