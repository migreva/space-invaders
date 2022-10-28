import { StoreState } from '@space-invaders/store';
import { DrawableItem } from '@space-invaders/store/state/position';
import { Shot } from '@space-invaders/store/user/shot';

export default function renderGame(state: StoreState, canvas: HTMLCanvasElement): void {
	console.log(state);
	const context: CanvasRenderingContext2D = canvas.getContext('2d');

	// TODO this is inefficient and we should only re-draw the parts of the canvas
	// that needs to be updated each time
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (state.state.paused) {
		context.fillText('Paused (hit Esc to unpause)', 0, 10);
	}

	// render users
	drawItem(state.user, canvas);

	// render shots
	state.user.shots.forEach((shot: Shot) => {
		drawItem(shot, canvas);
	})
}

/**
 * 
 * @param item an item that implements the DrawableItem interfaces
 * @param canvas the canvas its being rendered to
 */
function drawItem(item: DrawableItem, canvas: HTMLCanvasElement): void {
	const context: CanvasRenderingContext2D = canvas.getContext('2d');

	const leftMultiplier: number = canvas.width / 100;
	const topMultiplier: number = canvas.height / 100;

	// set the left and top, adjusting the top's location for height of the element
	const left: number = item.position.left * leftMultiplier;
	const top: number = (item.position.top * topMultiplier) - item.width;

	context.fillRect(left, top, item.width, item.height);
}
