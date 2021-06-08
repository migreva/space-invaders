import { createSlice, Slice } from '@reduxjs/toolkit';
import { TWO_D_POSITION } from '@space-invaders/store/state/position';

// life from 0-100
const MAX_LIFE: number = 100;

export interface UserState {
	life: number;
	position: TWO_D_POSITION;
	shotInProgress: boolean;
}

const initialUserState: UserState = {
	life: MAX_LIFE,
	position: {
		top: 100, 
		left: 50
	},
	shotInProgress: false,
};

export const userStore: Slice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		// in space invaders, the user can only move left and right
		moveLeft: (state: UserState): void => {
			state.position.left = Math.max(state.position.left - 1, 0);
		},
		moveRight: (state: UserState): void => {
			state.position.left = Math.min(state.position.left + 1, 100);
		},

		// trigger when the user hits 
		shoot: (state: UserState): void => {
			if (state.shotInProgress){
				return;
			}

			// TODO trigger shooting logic
			// need to pause shot when game is paused; game will be on a tick
			state.shotInProgress = true;
		}
	}
})

export const { moveLeft, moveRight, shoot } = userStore.actions

// for easy import into createStore
export default userStore.reducer;
