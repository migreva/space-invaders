import { store, StoreState } from '@space-invaders/store';
import gameRenderer from '@space-invaders/gameRenderer';
import { MAX_POSITION_LEFT, MAX_POSITION_TOP } from '@space-invaders/store/state/position'; 
import { handleUserInput, startGameTick, togglePause } from '@space-invaders/store/state';
import { AnyAction } from 'redux';

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = MAX_POSITION_LEFT;
canvas.height = MAX_POSITION_TOP;

// render the initial state of the game and subscribe to store changes
renderGame(store.getState());
store.subscribe(() => {
	renderGame(store.getState());
});

// start the tick
store.dispatch(startGameTick() as unknown as AnyAction);

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
		store.dispatch(handleUserInput(e) as unknown as AnyAction);
	}
})();
