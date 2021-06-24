import { DrawableItem } from '@space-invaders/store/state/position';
import { UserState } from '@space-invaders/store/user';

const SHOT_WIDTH: number = 3;
const SHOT_HEIGHT: number = 10;

export interface Shot extends DrawableItem {}

export function generateShot(user: UserState): Shot {
	return {
		position: {
			top: user.position.top - user.width,
			left: user.position.left,
		},
		width: SHOT_WIDTH,
		height: SHOT_HEIGHT
	}
}
