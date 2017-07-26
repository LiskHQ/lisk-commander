'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = listCommand;

var _config = require('../../config.json');

var _config2 = _interopRequireDefault(_config);

var _tablify = require('../utils/tablify');

var _tablify2 = _interopRequireDefault(_tablify);

var _query = require('../utils/query');

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listCommand(vorpal) {
	function switchType(type) {
		return {
			accounts: 'account',
			addresses: 'address',
			blocks: 'block',
			delegates: 'delegate',
			transactions: 'transaction'
		}[type];
	}

	vorpal.command('list <type> <variadic...>').option('-j, --json', 'Sets output to json').option('-t, --no-json', 'Sets output to text').description('Get information from <type> with parameters <input, input, ...>.  \n Types available: accounts, addresses, blocks, delegates, transactions \n E.g. list delegates lightcurve tosch \n E.g. list blocks 5510510593472232540 16450842638530591789').autocomplete(['accounts', 'addresses', 'blocks', 'delegates', 'transactions']).action(function (userInput) {
		var getType = {
			addresses: _query2.default.isAccountQuery.bind(_query2.default),
			accounts: _query2.default.isAccountQuery.bind(_query2.default),
			blocks: _query2.default.isBlockQuery.bind(_query2.default),
			delegates: _query2.default.isDelegateQuery.bind(_query2.default),
			transactions: _query2.default.isTransactionQuery.bind(_query2.default)
		};

		var calls = userInput.variadic.map(function (input) {
			return getType[userInput.type](input);
		});

		var shouldUseJsonOutput = (userInput.options.json === true || _config2.default.json === true) && userInput.options.json !== false;

		if (shouldUseJsonOutput) {
			return Promise.all(calls).then(function (result) {
				result.forEach(function (executed) {
					if (executed.error) {
						vorpal.log(JSON.stringify(executed));
					} else {
						vorpal.log(JSON.stringify(executed[switchType(userInput.type)]));
					}
				});

				return result;
			});
		}
		return Promise.all(calls).then(function (result) {
			result.forEach(function (executed) {
				if (executed.error) {
					vorpal.log((0, _tablify2.default)(executed).toString());
				} else {
					vorpal.log((0, _tablify2.default)(executed[switchType(userInput.type)]).toString());
				}
			});

			return result;
		}).catch(function (e) {
			return e;
		});
	});
}