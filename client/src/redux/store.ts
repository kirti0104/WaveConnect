import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tabReducer from './tabSlice';
import adminReducer from './adminSlice';
import preferencesReducer from './preferencesSlice'; // Import preferences slice
import  inviteFriendReducer  from './inviteFriendsSlice';



const store = configureStore({
  reducer: {
    user: userReducer,
    tab: tabReducer,
    adminUser: adminReducer,
    preferences: preferencesReducer, 
    inviteFriend: inviteFriendReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
