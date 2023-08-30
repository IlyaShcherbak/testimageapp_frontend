// Core
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API
import { API_URL } from '../../../init/constants';

// Tools
import { customFetch } from '../../../tools/utils';

// Types
import * as types from '../types';

// Action
const postImagesAction = createAction('images/POST_IMAGE');

export const postImages = createAsyncThunk<types.Images, /* payload type => */ FormData>(
    postImagesAction.type,
    async (payload) => {
        const result = await customFetch<types.Images>({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_URL}/images`, {
                method: 'POST',
                body:   payload,
            }),
        });

        return result;
    },
);
