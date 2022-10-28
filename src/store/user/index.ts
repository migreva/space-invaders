import { createSlice, Slice } from '@reduxjs/toolkit';
import { DrawableItem, MAX_POSITION_TOP, moveFunctions, TWO_D_POSITION } from '@space-invaders/store/state/position';
import { generateShot, Shot } from '@space-invaders/store/user/shot';

// life from 0-100
const MAX_LIFE: number = 100;

export interface UserState extends DrawableItem {
	life: number;
	shotInProgress: boolean;
	shots: Shot[];
}

const initialUserState: UserState = {
	life: MAX_LIFE,
	position: {
		top: 100, 
		left: 50
	},
	width: 10,
	height: 10,
	shotInProgress: false,
	shots: [],
};

export const userStore: Slice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		// in space invaders, the user can only move left and right
		moveLeft: (state: UserState): void => {
			state.position = moveFunctions.left(state.position)
		},
		moveRight: (state: UserState): void => {
			state.position = moveFunctions.right(state.position)
		},

		// trigger when the user hits 
		shoot: (state: UserState): void => {
			// dont allow another shot until the newest shot is at least 60% the way up the screen
			if (state.shots.length){
				const youngestShot: Shot = state.shots[state.shots.length - 1];
				if (youngestShot.position.top > (MAX_POSITION_TOP * 0.8)) {
					return;
				}
			}

			// need to pause shot when game is paused; game will be on a tick
			state.shots = [
				...state.shots,
				generateShot(state)
			];
		},

		// runs on game tick
		tick: (state: UserState): void => {
			// move each one of the shots
			state.shots = state.shots.map(
				(shot: Shot): Shot => {
					shot.position = moveFunctions.up(shot.position);
					return shot;
				}
			).filter((shot: Shot) => shot.position.top >= 0 && shot.position.left >= 0);
		}
	}
})

export const { moveLeft, moveRight, shoot, tick } = userStore.actions

// for easy import into createStore
export default userStore.reducer;
