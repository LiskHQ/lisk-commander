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
import packageJSON from '../package.json';

const nonInteractiveLiskyArg = process.argv[1];
const nonInteractiveCommandArg = process.argv[2];
const nonInteractiveOptions = process.argv.slice(3);

const exit = code => process.exit(code || 0);

const printWarning = message => console.warn('\x1b[33m', message, '\x1b[0m');
const printError = message => console.error('\x1b[31m', message, '\x1b[0m');
const printVersion = version => console.info(version);

const execClean = path => {
	printWarning(
		'WARNING: Attempting to remove configuration lockfile. I hope you know what you’re doing.',
	);
	lockfile.unlockSync(path);
};

const isUnknownCommand = (liskyInstance, command) => {
	const firstCommandWords = liskyInstance.commands.map(
		// eslint-disable-next-line no-underscore-dangle
		c => c._name.split(' ')[0],
	);
	return firstCommandWords.indexOf(command) === -1;
};

const setEnvironment = () => {
	process.env.LISKY_CONFIG_DIR =
		process.env.LISKY_CONFIG_DIR || `${os.homedir()}/.lisky`;

	process.env.NON_INTERACTIVE_MODE = !(
		nonInteractiveLiskyArg.endsWith('lisky') && process.argv.length === 2
	);
};

const checkNodeVersion = (expected, actual) => {
	if (!semver.satisfies(actual, expected)) {
		throw new Error(
			`ERROR: Requires Node.js version ${semver.clean(
				expected,
			)}, but was started with version ${semver.clean(actual)}.`,
		);
	}
};

const handleBasicCommands = (command, lockFilePath, version) => {
	switch (command) {
		case 'clean':
			execClean(lockFilePath);
			return true;
		case '--version':
		case '-v':
			printVersion(version);
			return true;
		default:
			return false;
	}
};

const getLiskyInstanceByMode = (liskyInstance, nonInteractiveMode) =>
	nonInteractiveMode ? liskyInstance.parse(process.argv) : liskyInstance;

const run = () => {
	setEnvironment();
	try {
		checkNodeVersion(packageJSON.engines.node, process.version);
	} catch (error) {
		printError(error.message);
		exit();
	}

	if (
		handleBasicCommands(
			nonInteractiveCommandArg,
			`${process.env.LISKY_CONFIG_DIR}/config.lock`,
			packageJSON.version,
		)
	) {
		exit();
	}

	// Dynamically required, otherwise it starts the CLI before handling above codes
	// eslint-disable-next-line global-require
	const lisky = require('../dist').default;
	// eslint-disable-next-line global-require
	const execFile = require('../dist/exec_file').default;
	if (isUnknownCommand(lisky, nonInteractiveCommandArg)) {
		try {
			// "execFile" throws error when it "nonInteractiveCommandArg" is not a filepath
			return execFile(
				lisky,
				nonInteractiveCommandArg,
				nonInteractiveOptions,
				exit,
			);
		} catch (error) {
			return getLiskyInstanceByMode(
				lisky,
				process.env.NON_INTERACTIVE_MODE === 'true',
			);
		}
	}
	return getLiskyInstanceByMode(
		lisky,
		process.env.NON_INTERACTIVE_MODE === 'true',
	);
};

run();

export default run;
