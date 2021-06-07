import store from '@space-invaders/store';

// subscribe to store changes
store.subscribe(() => {
	console.log(store.getState());
});

// set up inputs
(() => {
	document.addEventListener('keydown', userInputListener);

	function userInputListener(e: KeyboardEvent): void {
		console.log(e.key);
	}
})()
