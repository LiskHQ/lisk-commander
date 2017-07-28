import fse from 'fs-extra';
import config from '../../config.json';

const writeConfigToFile = (newConfig) => {
	const configString = JSON.stringify(newConfig, null, '\t');
	fse.writeFileSync('config.json', `${configString}\n`, 'utf8');
};

const checkBoolean = value => ['true', 'false'].includes(value);

const setBoolean = (variable, path) => (value) => {
	if (!checkBoolean(value)) {
		return { message: `Cannot set ${variable} to ${value}.` };
	}
	const newValue = (value === 'true');
	path
		.reduce((obj, pathComponent, i) => {
			if (i === path.length - 1) {
				// eslint-disable-next-line no-param-reassign
				obj[pathComponent] = newValue;
				return config;
			}
			return obj[pathComponent];
		}, config);

	writeConfigToFile(config);
	return { message: `Successfully set ${variable} to ${value}.` };
};

const set = (userInput, callback) => {
	const getType = {
		json: setBoolean('json output', ['json']),
		testnet: setBoolean('testnet', ['liskJS', 'testnet']),
	};

	const returnValue = Object.keys(getType).includes(userInput.variable)
		? getType[userInput.variable](userInput.value)
		: { message: 'Unsupported variable name.' };
	return (callback && typeof callback === 'function') ? callback(returnValue.message) : returnValue.message;
};

export default function setCommand(vorpal) {
	vorpal
		.command('set <variable> <value>')
		.description('Set configuration <variable> to <value>.')
		.action(set);
}
