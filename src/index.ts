
import { App } from '@space-invaders/apps/react/app';
import { store } from '@space-invaders/store';
import { handleUserInput, startGameTick } from '@space-invaders/store/state';
import { createRoot, Root } from "react-dom/client";
import { AnyAction } from 'redux';

/**
 * render a react app
 * 
 * @param root React root
 */
function renderApp(root: Root) {
	root.render(App({
		state: store.getState(),
	}));
}


(() => {
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
	document.addEventListener('keydown', userInputListener);
	function userInputListener(e: KeyboardEvent): void {
		store.dispatch(handleUserInput(e) as unknown as AnyAction);
	}
})();
