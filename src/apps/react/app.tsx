import { GameCanvas } from '@space-invaders/apps/react/components/game-canvas/game-canvas';
import { StoreState } from '@space-invaders/store';
import * as React from 'react';

interface AppProps {
	state: StoreState;
}

export function App(props: AppProps): JSX.Element {
	return (
		<div className="app-container">
				<GameCanvas {...props}/>
		</div>
	);
}
