// Core
import { createSlice } from '@reduxjs/toolkit';

// Types
import * as types from './types';

import { extraReducers } from './thunk';

const initialState = null;

export const imagesSlice = createSlice<types.ImagesState, {}>({
    name:     'images',
    initialState,
    reducers: {},
    extraReducers,
});

export const sliceName = imagesSlice.name;
export const imagesActions = imagesSlice.actions;
export default imagesSlice.reducer;
