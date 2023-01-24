import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "../reducers";
// configureStore will set up the Redux Store for us!

const store = configureStore({
    reducer: mainReducer,
});

export default store;
