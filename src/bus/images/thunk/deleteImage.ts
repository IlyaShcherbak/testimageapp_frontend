// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const deleteImageAction = createAction('images/DELETE_IMAGE');

export const deleteImage = createAsyncThunk<types.Images, /* payload type => */ string>(
    deleteImageAction.type,
    async (payload) => {
        const result = await customFetch<types.Images>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_URL}/images/${payload}`, {
                method:  'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body:   payload,
            }),
        });

        return result;
    },
);
