import { configureStore, Store } from '@reduxjs/toolkit';
import user from '@space-invaders/store/user';
import state from '@space-invaders/store/state'
import thunk from 'redux-thunk';

export const store: Store = configureStore({
	reducer: {
		user,
		state
	},
	middleware: [ thunk ]
});

export type StoreState = ReturnType<typeof store.getState>


