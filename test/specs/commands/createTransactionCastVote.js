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
import { setUpInputStubs } from '../../steps/utils';
import * as given from '../../steps/1_given';
import * as when from '../../steps/2_when';
import * as then from '../../steps/3_then';

describe('create transaction cast vote', () => {
	beforeEach(() => {
		setUpInputStubs();
	});
	describe('Given a Vorpal instance with a UI and an active command that can prompt', () => {
		beforeEach(given.aVorpalInstanceWithAUIAndAnActiveCommandThatCanPrompt);
		describe('Given an action "create transaction cast vote"', () => {
			beforeEach(given.anAction);
			describe('Given a passphrase "minute omit local rare sword knee banner pair rib museum shadow juice"', () => {
				beforeEach(given.aPassphrase);
				describe('Given a Lisk object that can create transactions', () => {
					beforeEach(given.aLiskObjectThatCanCreateTransactions);
					describe('Given a set of votes "+647aac1e2df8a5c870499d7ddc82236b1e10936977537a3844a6b05ea33f9ef6" and "96d78cb7d246dd3b426182763e464301835787e1fe8342532660eba75b6b97fc"', () => {
						beforeEach(given.aSetOfVotes);
						describe('Given an empty options object', () => {
							beforeEach(given.anEmptyOptionsObject);
							describe('When the action is called with the keysgroup, the lifetime, the minimum number of signatures and the options', () => {
								beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
								it('Then it should reject with message "TypeError: Invalid hex string +647aac1e2df8a5c870499d7ddc82236b1e10936977537a3844a6b05ea33f9ef6"', then.itShouldRejectWithMessage);
							});
						});
					});
					describe('Given a set of votes "647aac1e2df8a5c870499d7ddc82236b1e10936977537a3844a6b05ea33f9e" and "96d78cb7d246dd3b426182763e464301835787e1fe8342532660eba75b6b97fc"', () => {
						beforeEach(given.aSetOfVotes);
						describe('Given an empty options object', () => {
							beforeEach(given.anEmptyOptionsObject);
							describe('When the action is called with the keysgroup, the lifetime, the minimum number of signatures and the options', () => {
								beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
								it('Then it should reject with message "Public key 647aac1e2df8a5c870499d7ddc82236b1e10936977537a3844a6b05ea33f9e length differs from the expected 64 hex characters for a public key."', then.itShouldRejectWithMessage);
							});
						});
					});
					describe('Given a set of votes "647aac1e2df8a5c870499d7ddc82236b1e10936977537a3844a6b05ea33f9ef6" and "96d78cb7d246dd3b426182763e464301835787e1fe8342532660eba75b6b97fc"', () => {
						beforeEach(given.aSetOfVotes);
						describe('Given an options object with passphrase set to unknown source "xxx"', () => {
							beforeEach(given.anOptionsObjectWithPassphraseSetToUnknownSource);
							describe('When the action is called with the votes and the options', () => {
								beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
								it('Then it should reject with message "Unknown passphrase source type. Must be one of `file`, or `stdin`."', then.itShouldRejectWithMessage);
							});
						});
						describe('Given an options object with second passphrase set to unknown source "xxx"', () => {
							beforeEach(given.anOptionsObjectWithSecondPassphraseSetToUnknownSource);
							describe('When the action is called with the votes and the options', () => {
								beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
								it('Then it should reject with message "Unknown second passphrase source type. Must be one of `file`, or `stdin`."', then.itShouldRejectWithMessage);
							});
						});
						describe('Given an empty options object', () => {
							beforeEach(given.anEmptyOptionsObject);
							describe('Given the passphrase is provided via the prompt', () => {
								beforeEach(given.thePassphraseIsProvidedViaThePrompt);
								describe('When the action is called with the votes and the options', () => {
									beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
									it('Then it should not get the passphrase from stdin', then.itShouldNotGetThePassphraseFromStdIn);
									it('Then it should not get the second passphrase from stdin', then.itShouldNotGetTheSecondPassphraseFromStdIn);
									it('Then it should get the passphrase using the vorpal instance', then.itShouldGetThePassphraseUsingTheVorpalInstance);
									it('Then it should get the passphrase with a repeated prompt', then.itShouldGetThePassphraseWithARepeatedPrompt);
									it('Then it should not get the second passphrase', then.itShouldNotGetTheSecondPassphrase);
									it('Then it should create a cast vote transaction with the votes and the passphrase', then.itShouldCreateACastVotesTransactionWithTheVotesAndThePassphrase);
									it('Then it should resolve to the created transaction', then.itShouldResolveToTheCreatedTransaction);
								});
							});
						});
						describe('Given an options object with passphrase set to "stdin"', () => {
							beforeEach(given.anOptionsObjectWithPassphraseSetTo);
							describe('Given the passphrase is provided via stdin', () => {
								beforeEach(given.thePassphraseIsProvidedViaStdIn);
								describe('When the action is called with the votes and the options', () => {
									beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
									it('Then it should get the passphrase from stdin', then.itShouldGetThePassphraseFromStdIn);
									it('Then it should get the passphrase using the passphrase from stdin', then.itShouldGetThePassphraseUsingThePassphraseFromStdIn);
									it('Then it should not get the second passphrase', then.itShouldNotGetTheSecondPassphrase);
									it('Then it should create a cast vote transaction with the votes and the passphrase', then.itShouldCreateACastVotesTransactionWithTheVotesAndThePassphrase);
									it('Then it should resolve to the created transaction', then.itShouldResolveToTheCreatedTransaction);
								});
							});
						});
						describe('Given an options object with passphrase set to "file:/path/to/my/passphrase.txt"', () => {
							beforeEach(given.anOptionsObjectWithPassphraseSetTo);
							describe('Given the passphrase is provided via stdin', () => {
								beforeEach(given.thePassphraseIsProvidedViaStdIn);
								describe('When the action is called with the votes and the options', () => {
									beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
									it('Then it should not get the passphrase from stdin', then.itShouldNotGetThePassphraseFromStdIn);
									it('Then it should get the passphrase using the passphrase source', then.itShouldGetThePassphraseUsingThePassphraseSource);
									it('Then it should not get the second passphrase', then.itShouldNotGetTheSecondPassphrase);
									it('Then it should create a cast vote transaction with the votes and the passphrase', then.itShouldCreateACastVotesTransactionWithTheVotesAndThePassphrase);
									it('Then it should resolve to the created transaction', then.itShouldResolveToTheCreatedTransaction);
								});
							});
						});
						describe('Given a second passphrase "fame spoil quiz garbage mirror envelope island rapid lend year bike adapt"', () => {
							beforeEach(given.aSecondPassphrase);
							describe('Given an options object with second passphrase set to "stdin"', () => {
								beforeEach(given.anOptionsObjectWithSecondPassphraseSetTo);
								describe('Given the passphrase is provided via the prompt', () => {
									beforeEach(given.thePassphraseIsProvidedViaThePrompt);
									describe('Given the second passphrase is provided via stdin', () => {
										beforeEach(given.theSecondPassphraseIsProvidedViaStdIn);
										describe('When the action is called with the votes and the options', () => {
											beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
											it('Then it should get the passphrase using the vorpal instance', then.itShouldGetThePassphraseUsingTheVorpalInstance);
											it('Then it should get the passphrase with a repeated prompt', then.itShouldGetThePassphraseWithARepeatedPrompt);
											it('Then it should not get the passphrase from stdin', then.itShouldNotGetThePassphraseFromStdIn);
											it('Then it should get the second passphrase from stdin', then.itShouldGetTheSecondPassphraseFromStdIn);
											it('Then it should get the second passphrase using the second passphrase from stdin', then.itShouldGetTheSecondPassphraseUsingTheSecondPassphraseFromStdIn);
											it('Then it should create a cast vote transaction with the votes and the passphrase', then.itShouldCreateACastVotesTransactionWithTheVotesThePassphraseAndTheSecondPassphrase);
											it('Then it should resolve to the created transaction', then.itShouldResolveToTheCreatedTransaction);
										});
									});
								});
							});
							describe('Given an options object with second passphrase set to "file:/path/to/my/secondPassphrase.txt"', () => {
								beforeEach(given.anOptionsObjectWithSecondPassphraseSetTo);
								describe('Given the passphrase is provided via the prompt', () => {
									beforeEach(given.theSecondPassphraseIsProvidedViaStdIn);
									describe('When the action is called with the votes and the options', () => {
										beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
										it('Then it should get the passphrase using the vorpal instance', then.itShouldGetThePassphraseUsingTheVorpalInstance);
										it('Then it should get the passphrase with a repeated prompt', then.itShouldGetThePassphraseWithARepeatedPrompt);
										it('Then it should not get the passphrase from stdin', then.itShouldNotGetThePassphraseFromStdIn);
										it('Then it should not get the second passphrase from stdin', then.itShouldNotGetTheSecondPassphraseFromStdIn);
										it('Then it should get the second passphrase using the second passphrase source', then.itShouldGetTheSecondPassphraseUsingTheSecondPassphraseSource);
										it('Then it should create a cast vote transaction with the votes and the passphrase', then.itShouldCreateACastVotesTransactionWithTheVotesThePassphraseAndTheSecondPassphrase);
										it('Then it should resolve to the created transaction', then.itShouldResolveToTheCreatedTransaction);
									});
								});
							});
							describe('Given an options object with passphrase set to "file:/path/to/my/passphrase.txt" and second passphrase set to "file:/path/to/my/secondPassphrase.txt"', () => {
								beforeEach(given.anOptionsObjectWithPassphraseSetToAndSecondPassphraseSetTo);
								describe('When the action is called with the votes and the options', () => {
									beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
									it('Then it should not get the passphrase from stdin', then.itShouldNotGetThePassphraseFromStdIn);
									it('Then it should not get the second passphrase from stdin', then.itShouldNotGetTheSecondPassphraseFromStdIn);
									it('Then it should get the passphrase using the passphrase source', then.itShouldGetThePassphraseUsingThePassphraseSource);
									it('Then it should get the second passphrase using the second passphrase source', then.itShouldGetTheSecondPassphraseUsingTheSecondPassphraseSource);
									it('Then it should create a cast vote transaction with the votes and the passphrase', then.itShouldCreateACastVotesTransactionWithTheVotesThePassphraseAndTheSecondPassphrase);
									it('Then it should resolve to the created transaction', then.itShouldResolveToTheCreatedTransaction);
								});
							});
							describe('Given an options object with passphrase set to "stdin" and second passphrase set to "stdin"', () => {
								beforeEach(given.anOptionsObjectWithPassphraseSetToAndSecondPassphraseSetTo);
								describe('Given the passphrase is provided via stdin', () => {
									beforeEach(given.thePassphraseIsProvidedViaStdIn);
									describe('Given the second passphrase is provided via stdin', () => {
										beforeEach(given.theSecondPassphraseIsProvidedViaStdIn);
										describe('When the action is called with the votes and the options', () => {
											beforeEach(when.theActionIsCalledWithTheVotesAndTheOptions);
											it('Then it should get the passphrase from stdin', then.itShouldGetThePassphraseFromStdIn);
											it('Then it should get the passphrase using the passphrase from stdin', then.itShouldGetThePassphraseUsingThePassphraseFromStdIn);
											it('Then it should get the second passphrase from stdin', then.itShouldGetTheSecondPassphraseFromStdIn);
											it('Then it should get the second passphrase using the second passphrase from stdin', then.itShouldGetTheSecondPassphraseUsingTheSecondPassphraseFromStdIn);
											it('Then it should create a cast vote transaction with the votes and the passphrase', then.itShouldCreateACastVotesTransactionWithTheVotesThePassphraseAndTheSecondPassphrase);
											it('Then it should resolve to the created transaction', then.itShouldResolveToTheCreatedTransaction);
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});
