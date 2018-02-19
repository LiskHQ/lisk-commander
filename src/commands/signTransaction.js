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
import { ValidationError } from '../utils/error';
import { createCommand } from '../utils/helpers';
import getInputsFromSources from '../utils/input';
import commonOptions from '../utils/options';

const description = `Sign a transaction using your secret passphrase.

	Example: sign transaction '{"amount":"100","recipientId":"13356260975429434553L","senderPublicKey":null,"timestamp":52871598,"type":0,"fee":"10000000","recipientPublicKey":null,"asset":{}}'
`;

const handleErrors = error => {
	if (error.message.match(/Unexpected token . in JSON/)) {
		throw new ValidationError('Transaction was not valid JSON.');
	}
	throw error;
};

const processInputs = transaction => ({ passphrase, data }) => {
	const transactionObject = JSON.parse(transaction || data);
	return cryptoModule.signTransaction({
		transaction: transactionObject,
		passphrase,
	});
};

export const actionCreator = vorpal => async ({ transaction, options }) => {
	const transactionSource = options.transaction;
	const passphraseSource = options.passphrase;

	if (!transaction && !transactionSource) {
		throw new ValidationError('No transaction was provided.');
	}

	return getInputsFromSources(vorpal, {
		passphrase: {
			source: passphraseSource,
			repeatPrompt: true,
		},
		data: transaction
			? null
			: {
					source: transactionSource,
				},
	})
		.then(processInputs(transaction))
		.catch(handleErrors);
};

const signTransaction = createCommand({
	command: 'sign transaction [transaction]',
	description,
	actionCreator,
	options: [commonOptions.passphrase, commonOptions.transaction],
	errorPrefix: 'Could not sign transaction',
});

export default signTransaction;
