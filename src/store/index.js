import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./searchParams";

const store = configureStore({
	reducer: { searchParams: searchReducer },
});

export default store;
