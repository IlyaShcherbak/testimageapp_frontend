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

export const updateImage = createAsyncThunk<unknown, /* payload type => */ types.UpdateImage>(
    deleteImageAction.type,
    async (payload) => {
        const result = await customFetch({
            successStatusCode: 200,
            fetch:             () => fetch(`${API_URL}/images/${payload._id}/update`, {
                method: 'POST',
                body:   payload.formData,
            }),
        });

        return result;
    },
);
