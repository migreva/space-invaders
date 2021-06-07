import { configureStore } from '@reduxjs/toolkit';
import user from '@space-invaders/store/user';

export default configureStore({
	reducer: {
		user,
	}
});
