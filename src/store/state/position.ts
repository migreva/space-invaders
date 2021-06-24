

const MIN_POSITION: number = 0;

// make this a 
export const MAX_POSITION_TOP: number = 100;
export const MAX_POSITION_LEFT: number = 200;

export interface DrawableItem {
	position: TWO_D_POSITION;
	width: number;
	height: number;
}

// 2-d position, X/Y
export type TWO_D_POSITION = {
	top: number, 
	left: number,
};

export type TWO_D_DIRECTION = 'up' | 'right' | 'down' | 'left';

type moveFunction = (position: TWO_D_POSITION) => TWO_D_POSITION;

export const moveFunctions: { [key in TWO_D_DIRECTION]: moveFunction } = {
	up: (position) => ({
		// top: Math.max(MIN_POSITION, position.top - 1),
		top: position.top - 1,
		left: position.left,
	}),
	right: (position) => ({
		top: position.top,
		// left: Math.min(MAX_POSITION_LEFT, position.left + 1),
		left: position.left + 1,
	}),
	down: (position) => ({
		// top: Math.min(MAX_POSITION_TOP, position.top + 1),
		top: position.top + 1,
		left: position.left,
	}),
	left: (position) => ({
		top: position.top ,
		// left: Math.max(MIN_POSITION, position.left - 1),
		left: position.left - 1,
	}),
}
