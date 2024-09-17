import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedRegion: null,
	selectedType: null,
	toSearch: "",
};

const searchSlice = createSlice({
	name: "searchParams",
	initialState: initialState,
	reducers: {
		setRegion(state, action) {
			state.selectedRegion = action.payload;
		},
		setType(state, action) {
			state.selectedType = action.payload;
		},
		setSearch(state, action) {
			state.toSearch = action.payload;
		},
	},
});

export const { setRegion, setSearch, setType } = searchSlice.actions;

export default searchSlice.reducer;
