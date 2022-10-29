import { CanvasRenderingContext2DEvent } from 'jest-canvas-mock';

const FILL_TEXT_CANVAS_EVENT_TYPE: string = 'fillText';

function checkForCanvasText(canvas: HTMLCanvasElement, text: string): CanvasRenderingContext2DEvent[] { 
	const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
	const events: CanvasRenderingContext2DEvent[] = ctx.__getEvents();
	// console.log(events);

	// filter all canvas events down, and ensure a `fillText` event 
	// that matches the text exists
	return events
		.filter((canvasEvent) => canvasEvent.type === FILL_TEXT_CANVAS_EVENT_TYPE)
		.filter((canvasEvent) => canvasEvent.props.text?.toLowerCase().indexOf(text) !== 0);
}

/**
 * assert that certain text exists in the canvas
 * 
 * @param canvas the canvas to check
 * @param text the text to assert exists in the canvas
 */
export function assertCanvasTextExists(canvas: HTMLCanvasElement, text: string) {
	// we should have at least one fillText event that matches
	expect(checkForCanvasText(canvas, text).length >= 1).toBe(true);
}

/**
 * assert that certain text exists in the canvas
 * 
 * @param canvas the canvas to check
 * @param text the text to assert exists in the canvas
 */
export function assertCanvasTextDoesNotExists(canvas: HTMLCanvasElement, text: string) {
	// we should have at least one fillText event that matches
	expect(checkForCanvasText(canvas, text)).toHaveLength(0);
}


