/**
 * @jest-environment jsdom
 */

import { startGame, stopGame } from '@space-invaders/game';
import { assertCanvasTextDoesNotExists, assertCanvasTextExists } from '@space-invaders/utils/test-helpers/test-for-canvas-test';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import { screen } from '@testing-library/react';
import 'jest-canvas-mock';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
	act(() => {
		// start a game
		startGame();

		// run a single game tick
		jest.runOnlyPendingTimers();
	});
});

afterEach(() => {
	act(() => stopGame());

	// https://stackoverflow.com/a/50800473
	// to clear out the game in between tests
	document.getElementsByTagName('html')[0].innerHTML = ''; 
});

test('should render a canvas element', async (): Promise<void> => {
	await screen.findByTestId('game-canvas');
});

test('should pause the game when escape is pressed', async (): Promise<void> => {
	// first, ensure "Paused" does not exist
	const PAUSE_TEXT: string = 'Paused';
	const canvas: HTMLCanvasElement = await screen.findByTestId('game-canvas');
	assertCanvasTextDoesNotExists(
		canvas, 
		PAUSE_TEXT,
	);

	// pause the game and ensure the text exists
	fireEvent.keyDown(document, {
		key: 'Escape',
		code: 'Escape',
		keyCode: 192,
	});
	assertCanvasTextExists(
		canvas, 
		PAUSE_TEXT,
	);

	// now un-pause the game by keystroke
	canvas.getContext('2d').__clearEvents();
	fireEvent.keyDown(document, {
		key: 'Escape',
		code: 'Escape',
		keyCode: 192,
	});
	assertCanvasTextDoesNotExists(
		canvas, 
		PAUSE_TEXT,
	);
});


// test('should handle basic movement', async (): Promise<void> => {
	// const canvas: HTMLCanvasElement = await screen.findByTestId('game-canvas');
	// const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
	// const events = ctx.__getEvents();
	// console.log(events);

	// expect(events).toMatchSnapshot();
// });
