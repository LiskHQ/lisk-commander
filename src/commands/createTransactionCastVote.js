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
import {
	getStdIn,
	getPassphrase,
	getFirstLineFromString,
} from '../utils/input';
import { createCommand } from '../utils/helpers';
import commonOptions from '../utils/options';
import transactions from '../utils/transactions';

const description = `Creates a transaction which will cast votes if broadcast to the network.

	Examples:
	- create transaction cast vote 647aac1e2df8a5c870499d7ddc82236b1e10936977537a3844a6b05ea33f9ef6 96d78cb7d246dd3b426182763e464301835787e1fe8342532660eba75b6b97fc
	- create transaction 3
`;

const castVote = votes => ([passphrase, secondPassphrase]) =>
	transactions.createVote(passphrase, votes, secondPassphrase);

export const actionCreator = vorpal => async ({ votes, options }) => {
	const {
		passphrase: passphraseSource,
		'second-passphrase': secondPassphraseSource,
	} = options;

	const publicKeysWithPlus = votes.map((publicKey) => {
		try {
			Buffer.from(publicKey, 'hex').toString('hex');
		} catch (e) {
			throw new Error(`${e} ${publicKey}`);
		}
		if (publicKey.length !== 64) {
			throw new Error(`Public key ${publicKey} length differs from the expected 64 hex characters for a public key.`);
		}
		return `+${publicKey}`;
	});

	return getStdIn({
		passphraseIsRequired: passphraseSource === 'stdin',
		dataIsRequired: secondPassphraseSource === 'stdin',
	})
		.then(stdIn => getPassphrase(vorpal, passphraseSource, stdIn.passphrase, { shouldRepeat: true })
			.then(passphrase => (secondPassphraseSource ? getPassphrase(
				vorpal,
				secondPassphraseSource,
				getFirstLineFromString(stdIn.data),
				{ shouldRepeat: true, displayName: 'your second secret passphrase' },
			) : Promise.resolve(null))
				.then(secondPassphrase => [passphrase, secondPassphrase]),
			),
		)
		.then(castVote(publicKeysWithPlus));
};

const createTransactionCastVote = createCommand({
	command: 'create transaction cast vote <votes...>',
	alias: 'create transaction 3',
	description,
	actionCreator,
	options: [
		commonOptions.passphrase,
		commonOptions.secondPassphrase,
	],
	errorPrefix: 'Could not create cast vote transaction',
});

export default createTransactionCastVote;
