'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _config = require('./../config.json');

var _config2 = _interopRequireDefault(_config);

var _package = require('../package.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lisky = (0, _vorpal2.default)();

var commandsDir = _path2.default.join(__dirname, 'commands');

_fsExtra2.default.readdirSync(commandsDir).forEach(function (command) {
	var commandPath = _path2.default.join(commandsDir, command);
	// eslint-disable-next-line global-require, import/no-dynamic-require
	var commandModule = require(commandPath);
	lisky.use(commandModule.default);
});

var logo = '\n _ _     _\n| (_)___| | ___   _\n| | / __| |/ / | | |\n| | \\__ \\   <| |_| |\n|_|_|___/_|\\_\\\\__, |\n              |___/\n';

var message = '\nRunning v' + _package.version + '.\nType `help` to get started.\n';
var intro = '' + logo + message;

var isInteractive = process.argv.length > 2;

lisky.delimiter('lisky>').history('lisky');

if (!isInteractive) {
	lisky.log(intro).show();
}

lisky.find('help').alias('?');
lisky.find('exit').description('Exits ' + _config2.default.name + '.');

exports.default = lisky;