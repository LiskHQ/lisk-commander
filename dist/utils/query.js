'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _liskInstance = require('./liskInstance');

var _liskInstance2 = _interopRequireDefault(_liskInstance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Query = function () {
	function Query() {
		_classCallCheck(this, Query);

		this.client = _liskInstance2.default;
	}

	_createClass(Query, [{
		key: 'isBlockQuery',
		value: function isBlockQuery(input) {
			// console.log(this);
			return this.client.sendRequest('blocks/get', { id: input });
		}
	}, {
		key: 'isAccountQuery',
		value: function isAccountQuery(input) {
			return this.client.sendRequest('accounts', { address: input });
		}
	}, {
		key: 'isTransactionQuery',
		value: function isTransactionQuery(input) {
			return this.client.sendRequest('transactions/get', { id: input });
		}
	}, {
		key: 'isDelegateQuery',
		value: function isDelegateQuery(input) {
			return this.client.sendRequest('delegates/get', { username: input });
		}
	}]);

	return Query;
}();

exports.default = new Query();