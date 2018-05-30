#!/usr/bin/env node
/*
 * LiskHQ/lisky
 * Copyright © 2017 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
import os from 'os';
import lockfile from 'lockfile';
import semver from 'semver';
// eslint-disable-next-line import/order
import packageJSON from '../package.json';

const nonInteractiveLiskyArg = process.argv[1];
const nonInteractiveCommandArg = process.argv[2];

process.env.LISKY_CONFIG_DIR =
	process.env.LISKY_CONFIG_DIR || `${os.homedir()}/.lisky`;
const configLockfilePath = `${process.env.LISKY_CONFIG_DIR}/config.lock`;

process.env.NON_INTERACTIVE_MODE = !(
	nonInteractiveLiskyArg.endsWith('lisky') && process.argv.length === 2
);

function exit(code) {
	process.exit(code || 0);
}

if (!semver.satisfies(process.version, packageJSON.engines.node)) {
	console.error(
		'\x1b[31m',
		`ERROR: Requires Node.js version ${semver.clean(
			packageJSON.engines.node,
		)}, but was started with version ${semver.clean(process.version)}.`,
		'\x1b[0m',
	);
	exit();
}

switch (process.argv[2]) {
	case 'clean':
		console.warn(
			'\x1b[33m',
			'WARNING: Attempting to remove configuration lockfile. I hope you know what you’re doing.',
			'\x1b[0m',
		);
		lockfile.unlockSync(configLockfilePath);
		exit();
		break;
	case '--version':
	case '-v':
		console.info(packageJSON.version);
		exit();
		break;
	default:
	// continue...
}

const lisky = require('../dist').default;
const execFile = require('../dist/exec_file').default;

// eslint-disable-next-line no-underscore-dangle
const firstCommandWords = lisky.commands.map(c => c._name.split(' ')[0]);

let commandArgIsFilePath = false;
if (firstCommandWords.indexOf(nonInteractiveCommandArg) === -1) {
	commandArgIsFilePath = true;
	try {
		const nonInteractiveOptions = process.argv.slice(3);
		execFile(lisky, nonInteractiveCommandArg, nonInteractiveOptions, exit);
	} catch (error) {
		commandArgIsFilePath = false;
	}
}

if (!commandArgIsFilePath) {
	module.exports =
		process.env.NON_INTERACTIVE_MODE === 'true'
			? lisky.parse(process.argv)
			: lisky;
}
