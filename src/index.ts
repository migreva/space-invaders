import { store, StoreState } from '@space-invaders/store';
import gameRenderer from '@space-invaders/gameRenderer';

const canvas: HTMLCanvasElement = document.createElement('canvas');

// render the initial state of the game and subscribe to store changes
gameRenderer(store.getState(), canvas);
store.subscribe(() => {
	renderGame(store.getState());
});

// render the new game based on the new game state;
function renderGame(state: StoreState): void {
	gameRenderer(state, canvas);
}

// init the game; render canvas element, set up listeners
(() => {
	document.addEventListener('keydown', userInputListener);

	document.body.append(canvas);

	// track user keydown events
	function userInputListener(e: KeyboardEvent): void {
		switch (e.key) {
			case 'ArrowLeft':
				store.dispatch({
					type: 'user/moveLeft',
				})
				return;
			case 'ArrowRight':
				store.dispatch({
					type: 'user/moveRight',
				})
				return;
			case ' ':
				store.dispatch({
					type: 'user/shoot',
				})
		}
	}
})();
