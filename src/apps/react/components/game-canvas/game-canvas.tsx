import renderGame from '@space-invaders/gameRenderer';
import { StoreState } from '@space-invaders/store';
import { MAX_POSITION_LEFT, MAX_POSITION_TOP } from '@space-invaders/store/state/position';
import * as React from 'react';

interface GameCanvasProps {
	state: StoreState;
}

export function GameCanvas(props: GameCanvasProps): JSX.Element {
	const canvas: React.MutableRefObject<HTMLCanvasElement> = React.useRef();

	React.useEffect((): void => {
		renderGame(props.state, canvas.current);
	});

	return (
		<canvas ref={canvas} width={MAX_POSITION_LEFT} height={MAX_POSITION_TOP}/>
	);
}
