/**
 * @jest-environment jsdom
 */

import { startGame, stopGame } from '@space-invaders/index';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
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
	
});
