/**
 * @jest-environment jsdom
 */

import { Store } from '@reduxjs/toolkit';
import { App } from '@space-invaders/apps/react/app';
import { store } from '@space-invaders/store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-canvas-mock';


test('should render a canvas element', (): void => {
	const currentStore: Store = store;
	render(App({
		state: currentStore.getState()
	}));

	screen.findByTestId('game-canvas');
});
