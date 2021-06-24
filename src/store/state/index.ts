import { AnyAction, createSlice, PayloadAction, Slice, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { StoreState } from '@space-invaders/store/';
import { tick as UserTick } from '@space-invaders/store/user';

const GAME_TICK_TIMEOUT: number = 50;

export interface CoreGameState {
	lastTick: ReturnType<typeof setTimeout>;
	paused: boolean;
};

const initialState: CoreGameState = {
	lastTick: null,
	paused: false,
}

export const stateStore: Slice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		setTick: (state: CoreGameState, action: PayloadAction<ReturnType<typeof setTimeout>>) => {
			state.paused = false;
			state.lastTick = action.payload;
		},
		pauseGame: (state: CoreGameState) => {
			if (!state.lastTick) {
				return;
			}

			state.paused = true;
			clearTimeout(state.lastTick);
		},
	}
});

const { setTick, pauseGame } = stateStore.actions;

export default stateStore.reducer;

export function startGameTick(): ThunkAction<void, StoreState, unknown, AnyAction> {
	return (dispatch: ThunkDispatch<StoreState, unknown, AnyAction>, getState: () => StoreState): void => {
		const store: StoreState = getState();

		// dispatch the user tick
		dispatch(UserTick(store));

		// TODO dispatch the enemies tick

		// set the tick up on a timeout
		dispatch(setTick(setTimeout(() => {
			dispatch(startGameTick());
		}, GAME_TICK_TIMEOUT)));
	}
}

export function togglePause(): ThunkAction<void, CoreGameState, unknown, AnyAction> {
	return (dispatch: ThunkDispatch<CoreGameState, unknown, AnyAction>, getState: () => CoreGameState): void => {
		const store: StoreState = getState();

		if (store.state.paused) {
			dispatch(startGameTick());
		} else {
			dispatch(pauseGame(store.state));
		}
	}
} 

export function handleUserInput(e: KeyboardEvent): ThunkAction<void, CoreGameState, unknown, AnyAction> {
	return (dispatch: ThunkDispatch<StoreState, unknown, AnyAction>, getState: () => StoreState): void => {
		const store: StoreState = getState();

		// keys that exist indepedent of the game state
		if (e.key === 'Escape') {
			dispatch(togglePause() as unknown as AnyAction);
			return;
		}

		// ignore any input while the game is paused
		if (store.state.paused) {
			return;
		}

		switch (e.key) {
			case 'ArrowLeft':
				dispatch({
					type: 'user/moveLeft',
				})
				return;
			case 'ArrowRight':
				dispatch({
					type: 'user/moveRight',
				})
				return;
			case ' ':
				dispatch({
					type: 'user/shoot',
				})
				return
		}
	};
}
