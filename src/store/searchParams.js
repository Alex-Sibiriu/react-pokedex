import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedGeneration: null,
	selectedTypes: {
		type_1: null,
		type_2: null,
	},
	toSearch: "",
};

const searchSlice = createSlice({
	name: "searchParams",
	initialState: initialState,
	reducers: {
		setGeneration(state, action) {
			state.selectedGeneration = action.payload;
		},
		setType1(state, action) {
			state.selectedTypes.type_1 = action.payload;
		},
		setType2(state, action) {
			state.selectedTypes.type_2 = action.payload;
		},
		setSearch(state, action) {
			state.toSearch = action.payload;
		},
	},
});

export const { setGeneration, setSearch, setType1, setType2 } =
	searchSlice.actions;

export default searchSlice.reducer;
