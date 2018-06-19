/*
 * LiskHQ/lisk-commander
 * Copyright © 2017–2018 Lisk Foundation
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
import cryptography from '../utils/cryptography';
import { ValidationError } from '../utils/error';
import { createCommand } from '../utils/helpers';
import { createMnemonicPassphrase } from '../utils/mnemonic';
import commonOptions from '../utils/options';

const description = `Returns a list of randomly-generated mnemonic passphrase with its corresponding public key and address.

	Examples:
	- create account
	- create account -n 50
`;

const checkIsInt = number => Number.isInteger(parseInt(number, 10));

const checkIsPositiveInt = number => parseInt(number, 10) > 0;

export const actionCreator = () => async ({ options }) => {
	const { number = 1 } = options || {};

	if (!checkIsInt(number)) {
		throw new ValidationError(
			`${number} doesn't represent a valid Integer corresponding to number of accounts`,
		);
	}

	if (!checkIsPositiveInt(number)) {
		throw new ValidationError('Please provide a number greater than zero');
	}

	const accountsArray = new Array(number).fill(0).map(() => {
		const passphrase = createMnemonicPassphrase();
		const { privateKey, publicKey } = cryptography.getKeys(passphrase);
		const { address } = cryptography.getAddressFromPublicKey(publicKey);
		return {
			passphrase,
			privateKey,
			publicKey,
			address,
		};
	});

	return accountsArray;
};

const createAccount = createCommand({
	command: 'create account',
	description,
	actionCreator,
	options: [commonOptions.numberOfAccounts],
	errorPrefix: 'Could not create account',
});

export default createAccount;
