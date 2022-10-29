/**
 * @jest-environment jsdom
 */

import { startGame, stopGame } from '@space-invaders/index';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import 'jest-canvas-mock';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
	act(() => startGame());
});

afterEach(() => {
	act(() => stopGame());
});

test('should render a canvas element', (): void => {
	screen.findByTestId('game-canvas');
});

test('should pause the game when escape is pressed', (): void => {
	// first, ensure "Paused" does not exist
	const PAUSE_TEXT: string = 'Paused';
	expect(screen.queryByText(PAUSE_TEXT)).not.toBeInTheDocument();

	// pause the game and ensure the text exists
	fireEvent.keyDown(document, {
		key: 'Esc',
		code: 'Esc',
		keyCode: 192,
	});
	screen.findByText('Paused');

	// now un-pause the game by keystroke
	fireEvent.keyDown(document, {
		key: 'Esc',
		code: 'Esc',
		keyCode: 192,
	});
	expect(screen.queryByText(PAUSE_TEXT)).not.toBeInTheDocument();
});
