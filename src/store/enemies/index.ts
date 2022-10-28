import { DrawableItem } from '@space-invaders/store/state/position';

export interface Enemy extends DrawableItem {
	
}

export interface EnemyState {
	enemies: Enemy[]
}
