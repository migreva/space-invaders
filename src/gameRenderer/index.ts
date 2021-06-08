import { StoreState } from '@space-invaders/store';
import { TWO_D_POSITION } from '@space-invaders/store/state/position';
import { UserState } from '@space-invaders/store/user';

export default function renderGame(state: StoreState, canvas: HTMLCanvasElement): void {
	const context: CanvasRenderingContext2D = canvas.getContext('2d');

	// TODO this is inefficient and we should only re-draw the parts of the canvas
	// that needs to be updated each time
	context.clearRect(0, 0, canvas.width, canvas.height);

	const { position }: UserState = state.user;
	const {
		top,
		left, 
	}: TWO_D_POSITION = storePositionToCanvasPosition(position, canvas);
	context.fillRect(left, top - 10, 10, 10);
}

/**
 * 
 * @param position the 2d position from the store (scale of 0-100)
 * @param canvas the canvas its being rendered to
 */
function storePositionToCanvasPosition(position: TWO_D_POSITION, canvas: HTMLCanvasElement): TWO_D_POSITION {
	const { height, width }: HTMLCanvasElement = canvas;
	const leftMultiplier: number = width / 100;
	const topMultiplier: number = height / 100;

	return {
		left: position.left * leftMultiplier,
		top: position.top * topMultiplier,
	}
}
