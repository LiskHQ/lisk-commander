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
import { setUpCommandSignTransaction } from '../../steps/setup';
import * as given from '../../steps/1_given';
import * as when from '../../steps/2_when';
import * as then from '../../steps/3_then';

describe('sign transaction command', () => {
	beforeEach(setUpCommandSignTransaction);
	Given(
		'a Vorpal instance with a UI and an active command that can prompt',
		given.aVorpalInstanceWithAUIAndAnActiveCommandThatCanPrompt,
		() => {
			Given(
				'a crypto instance has been initialised',
				given.aCryptoInstanceHasBeenInitialised,
				() => {
					Given('an action "sign transaction"', given.anAction, () => {
						Given(
							'a passphrase "minute omit local rare sword knee banner pair rib museum shadow juice"',
							given.aPassphrase,
							() => {
								Given(
									'an invalid transaction JSON string "not json"',
									given.anInvalidTransactionJSONString,
									() => {
										Given(
											'an empty options object',
											given.anEmptyOptionsObject,
											() => {
												When(
													'the action is called with the transaction and the options',
													when.theActionIsCalledWithTheTransactionAndTheOptions,
													() => {
														Then(
															'it should reject with validation error and message "Transaction was not valid JSON."',
															then.itShouldRejectWithValidationErrorAndMessage,
														);
													},
												);
											},
										);
									},
								);
								Given(
									'an unsigned transaction \'{"amount":"100","recipientId":"13356260975429434553L","senderPublicKey":null,"timestamp":52871598,"type":0,"fee":"10000000","recipientPublicKey":null,"asset":{}}\'',
									given.anUnsignedTransaction,
									() => {
										Given(
											'an empty options object',
											given.anEmptyOptionsObject,
											() => {
												When(
													'the action is called with the options',
													when.theActionIsCalledWithTheOptions,
													() => {
														Then(
															'it should reject with validation error and message "No transaction was provided."',
															then.itShouldRejectWithValidationErrorAndMessage,
														);
													},
												);
												Given(
													'an error "Unknown data source type." occurs retrieving the inputs from their sources',
													given.anErrorOccursRetrievingTheInputsFromTheirSources,
													() => {
														When(
															'the action is called with the transaction and the options',
															when.theActionIsCalledWithTheTransactionAndTheOptions,
															() => {
																Then(
																	'it should reject with the error message',
																	then.itShouldRejectWithTheErrorMessage,
																);
															},
														);
													},
												);
												Given(
													'the passphrase can be retrieved from its source',
													given.thePassphraseCanBeRetrievedFromItsSource,
													() => {
														When(
															'the action is called with the transaction and the options',
															when.theActionIsCalledWithTheTransactionAndTheOptions,
															() => {
																Then(
																	'it should get the inputs from sources using the Vorpal instance',
																	then.itShouldGetTheInputsFromSourcesUsingTheVorpalInstance,
																);
																Then(
																	'it should get the inputs from sources using the passphrase source with a repeating prompt',
																	then.itShouldGetTheInputsFromSourcesUsingThePassphraseSourceWithARepeatingPrompt,
																);
																Then(
																	'it should not get the inputs from sources using the transaction source',
																	then.itShouldNotGetTheInputsFromSourcesUsingTheTransactionSource,
																);
																Then(
																	'it should sign the transaction with the passphrase',
																	then.itShouldSignTheTransactionWithThePassphrase,
																);
																Then(
																	'it should resolve to the result of signing the transaction',
																	then.itShouldResolveToTheResultOfSigningTheTransaction,
																);
															},
														);
													},
												);
											},
										);
										Given(
											'an options object with passphrase set to "passphraseSource"',
											given.anOptionsObjectWithPassphraseSetTo,
											() => {
												Given(
													'an error "Unknown data source type." occurs retrieving the inputs from their sources',
													given.anErrorOccursRetrievingTheInputsFromTheirSources,
													() => {
														When(
															'the action is called with the transaction and the options',
															when.theActionIsCalledWithTheTransactionAndTheOptions,
															() => {
																Then(
																	'it should reject with the error message',
																	then.itShouldRejectWithTheErrorMessage,
																);
															},
														);
													},
												);
												Given(
													'the passphrase can be retrieved from its source',
													given.thePassphraseCanBeRetrievedFromItsSource,
													() => {
														When(
															'the action is called with the transaction and the options',
															when.theActionIsCalledWithTheTransactionAndTheOptions,
															() => {
																Then(
																	'it should get the inputs from sources using the Vorpal instance',
																	then.itShouldGetTheInputsFromSourcesUsingTheVorpalInstance,
																);
																Then(
																	'it should get the inputs from sources using the passphrase source with a repeating prompt',
																	then.itShouldGetTheInputsFromSourcesUsingThePassphraseSourceWithARepeatingPrompt,
																);
																Then(
																	'it should not get the inputs from sources using the transaction source',
																	then.itShouldNotGetTheInputsFromSourcesUsingTheTransactionSource,
																);
																Then(
																	'it should sign the transaction with the passphrase',
																	then.itShouldSignTheTransactionWithThePassphrase,
																);
																Then(
																	'it should resolve to the result of signing the transaction',
																	then.itShouldResolveToTheResultOfSigningTheTransaction,
																);
															},
														);
													},
												);
											},
										);
										Given(
											'an options object with transaction set to "transactionSource"',
											given.anOptionsObjectWithTransactionSetTo,
											() => {
												Given(
													'an error "Unknown data source type." occurs retrieving the inputs from their sources',
													given.anErrorOccursRetrievingTheInputsFromTheirSources,
													() => {
														When(
															'the action is called with the transaction and the options',
															when.theActionIsCalledWithTheTransactionAndTheOptions,
															() => {
																Then(
																	'it should reject with the error message',
																	then.itShouldRejectWithTheErrorMessage,
																);
															},
														);
													},
												);
												Given(
													'the passphrase and transaction can be retrieved from their sources',
													given.thePassphraseAndTransactionCanBeRetrievedFromTheirSources,
													() => {
														When(
															'the action is called with the options',
															when.theActionIsCalledWithTheOptions,
															() => {
																Then(
																	'it should get the inputs from sources using the Vorpal instance',
																	then.itShouldGetTheInputsFromSourcesUsingTheVorpalInstance,
																);
																Then(
																	'it should get the inputs from sources using the passphrase source with a repeating prompt',
																	then.itShouldGetTheInputsFromSourcesUsingThePassphraseSourceWithARepeatingPrompt,
																);
																Then(
																	'it should get the inputs from sources using the transaction source',
																	then.itShouldGetTheInputsFromSourcesUsingTheTransactionSource,
																);
																Then(
																	'it should sign the transaction with the passphrase',
																	then.itShouldSignTheTransactionWithThePassphrase,
																);
																Then(
																	'it should resolve to the result of signing the transaction',
																	then.itShouldResolveToTheResultOfSigningTheTransaction,
																);
															},
														);
													},
												);
											},
										);
										Given(
											'an options object with passphrase set to "passphraseSource" and transaction set to "transactionSource"',
											given.anOptionsObjectWithPassphraseSetToAndTransactionSetTo,
											() => {
												Given(
													'an error "Unknown data source type." occurs retrieving the inputs from their sources',
													given.anErrorOccursRetrievingTheInputsFromTheirSources,
													() => {
														When(
															'the action is called with the transaction and the options',
															when.theActionIsCalledWithTheTransactionAndTheOptions,
															() => {
																Then(
																	'it should reject with the error message',
																	then.itShouldRejectWithTheErrorMessage,
																);
															},
														);
													},
												);
												Given(
													'the passphrase and transaction can be retrieved from their sources',
													given.thePassphraseAndTransactionCanBeRetrievedFromTheirSources,
													() => {
														When(
															'the action is called with the options',
															when.theActionIsCalledWithTheOptions,
															() => {
																Then(
																	'it should get the inputs from sources using the Vorpal instance',
																	then.itShouldGetTheInputsFromSourcesUsingTheVorpalInstance,
																);
																Then(
																	'it should get the inputs from sources using the passphrase source with a repeating prompt',
																	then.itShouldGetTheInputsFromSourcesUsingThePassphraseSourceWithARepeatingPrompt,
																);
																Then(
																	'it should get the inputs from sources using the transaction source',
																	then.itShouldGetTheInputsFromSourcesUsingTheTransactionSource,
																);
																Then(
																	'it should sign the transaction with the passphrase',
																	then.itShouldSignTheTransactionWithThePassphrase,
																);
																Then(
																	'it should resolve to the result of signing the transaction',
																	then.itShouldResolveToTheResultOfSigningTheTransaction,
																);
															},
														);
													},
												);
											},
										);
									},
								);
							},
						);
					});
				},
			);
		},
	);
});
