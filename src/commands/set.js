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
import { CONFIG_VARIABLES } from '../utils/constants';
import config, {
	configFilePath,
	configSchema,
	setConfig,
} from '../utils/config';
import { writeJsonSync } from '../utils/fs';
import { createCommand } from '../utils/helpers';
import liskAPIInstance from '../utils/api';

const description = `Set configuration <variable> to <value>. Variables available as in config file structure. Nested values are seperated by a dot. Configuration is persisted in \`${
	configFilePath
}\`.

	Examples:
	- set json true
	- set name my_custom_lisky
	- set liskJS.testnet true
	- set liskJS.ssl true
`;

const WRITE_FAIL_WARNING =
	'Config file could not be written: your changes will not be persisted.';

const writeConfigToFile = newConfig => {
	try {
		writeJsonSync(configFilePath, newConfig);
		return true;
	} catch (e) {
		return false;
	}
};

const typeOf = obj =>
	({}.toString
		.call(obj)
		.match(/\s([a-zA-Z]+)/)[1]
		.toLowerCase());
const checkBoolean = value => ['true', 'false'].includes(value);
const sanitizeValue = (variable, value) =>
	configSchema[variable] === 'boolean' && checkBoolean(value)
		? JSON.parse(value)
		: value;

export const actionCreator = () => async ({ variable, value }) => {
	const expectedVariableFormat = configSchema[variable];
	if (!expectedVariableFormat) throw new Error('Unsupported variable name.');

	const valueToSet = sanitizeValue(variable, value);
	if (typeOf(valueToSet) !== expectedVariableFormat)
		throw new Error(
			`Wrong format for ${variable} - ${valueToSet}. Expected ${
				expectedVariableFormat
			}.`,
		);

	if (variable === 'liskJS.testnet') {
		liskAPIInstance.setTestnet(valueToSet);
	}

	if (variable === 'liskJS.ssl') {
		liskAPIInstance.setSSL(valueToSet);
	}

	setConfig(config, variable, valueToSet);

	const writeSuccess = writeConfigToFile(config);

	if (!writeSuccess && process.env.NON_INTERACTIVE_MODE === 'true') {
		throw new Error(WRITE_FAIL_WARNING);
	}

	const result = {
		message: `Successfully set ${variable} to ${valueToSet}.`,
	};

	if (!writeSuccess) {
		result.warning = WRITE_FAIL_WARNING;
	}

	return result;
};

const set = createCommand({
	command: 'set <variable> <value>',
	autocomplete: CONFIG_VARIABLES,
	description,
	actionCreator,
	errorPrefix: 'Could not set config variable',
});

export default set;
