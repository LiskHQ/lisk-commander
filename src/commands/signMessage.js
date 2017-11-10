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
import cryptoModule from '../utils/cryptoModule';
import { createCommand } from '../utils/helpers';
import {
	getStdIn,
	getPassphrase,
	getData,
} from '../utils/input';
import commonOptions from '../utils/options';

const description = `Sign a message using your secret passphrase.

	Example: sign message 'Hello world'
`;


const handlePassphraseAndMessage = ([passphrase, message]) =>
	cryptoModule.signMessage(message, passphrase);

export const actionCreator = vorpal => async ({ message, options }) => {
	const messageSource = options.message;
	const passphraseSource = options.passphrase;

	if (!message && !messageSource) {
		throw new Error('No message was provided.');
	}

	return getStdIn({
		passphraseIsRequired: passphraseSource === 'stdin',
		dataIsRequired: messageSource === 'stdin',
	})
		.then(stdIn => Promise.all([
			getPassphrase(vorpal, passphraseSource, stdIn.passphrase, { shouldRepeat: true }),
			getData(message, messageSource, stdIn.data),
		]))
		.then(handlePassphraseAndMessage);
};

const signMessage = createCommand({
	command: 'sign message [message]',
	description,
	actionCreator,
	options: [
		commonOptions.passphrase,
		commonOptions.message,
	],
	errorPrefix: 'Could not sign message',
});

export default signMessage;
