// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const fetchImagesAction = createAction('images/FETCH_IMAGE');

export const fetchImages = createAsyncThunk<types.Images>(
    fetchImagesAction.type,
    async () => {
        const result = await customFetch<types.Images>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_URL}/images`, {
                method:  'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        });

        return result;
    },
);
