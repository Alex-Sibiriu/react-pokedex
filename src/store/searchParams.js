import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedGeneration: null,
	selectedType: null,
	toSearch: "",
};

const searchSlice = createSlice({
	name: "searchParams",
	initialState: initialState,
	reducers: {
		setGeneration(state, action) {
			state.selectedGeneration = action.payload;
		},
		setType(state, action) {
			state.selectedType = action.payload;
		},
		setSearch(state, action) {
			state.toSearch = action.payload;
		},
	},
});

export const { setGeneration, setSearch, setType } = searchSlice.actions;

export default searchSlice.reducer;
