
import { App } from '@space-invaders/apps/react/app';
import { store } from '@space-invaders/store';
import { handleUserInput, startGameTick, stopGameTick } from '@space-invaders/store/state';
import { createRoot, Root } from 'react-dom/client';
import { AnyAction } from 'redux';

/**
 * render a react app
 * 
 * @param root React root
 */
function renderApp(root: Root): void {
	// render our react app
	root.render(App({
		state: store.getState(),
	}));
}

/**
 * 
 * @param e keydown 
 */
function userKeydownInput(e: KeyboardEvent): void {
	store.dispatch(handleUserInput(e) as unknown as AnyAction);
}

export function startGame(): void {
	// init the root HTML element
	const rootHTMLElement: HTMLDivElement = document.createElement('div');
	document.body.appendChild(rootHTMLElement);

	// TODO segment this out to init the correct app based on URL
	// create app, subscribe to event state
	const root: Root = createRoot(rootHTMLElement);
	renderApp(root);
	store.subscribe(() => {
		renderApp(root);
	});

	// start the tick
	store.dispatch(startGameTick() as unknown as AnyAction);

	// track user keydown events
	document.addEventListener('keydown', userKeydownInput);
}

export function stopGame() {
	store.dispatch(stopGameTick() as unknown as AnyAction);
	document.removeEventListener('keydown', userKeydownInput);
}
