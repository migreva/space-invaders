import { configureStore, Store } from '@reduxjs/toolkit';
import user from '@space-invaders/store/user';

export const store: Store = configureStore({
	reducer: {
		user,
	}
});

export type StoreState = ReturnType<typeof store.getState>


