// Core
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Tools
import { useDispatch } from '../../../tools/hooks';

// Thunk
import { fetchImages } from './fetchImages';
import { postImages } from './postImages';
import { deleteImage } from './deleteImage';
import { updateImage } from './updateImage';

// Types
import * as types from '../types';

// Reducers
export const extraReducers = (builder: ActionReducerMapBuilder<types.ImagesState>) => {
    builder /* CASES */
        .addCase(fetchImages.fulfilled, (/* state => */__, action) => {
            return action.payload;
        })
        .addCase(postImages.fulfilled, (state, action) => {
            if (state === null) {
                return [ ...action.payload ];
            }

            return [ ...action.payload, ...state ];
        })
        .addCase(deleteImage.fulfilled, () => {
            // return action.payload;
        });
    // .addCase(updateImage.fulfilled, () => {
    //     // return action.payload;
    // });
};

// Hook
export const useImagesThunk = () => {
    const dispatch = useDispatch();

    return {
        fetchImages: () => void dispatch(fetchImages()),
        postImages:  (formData: FormData) => void dispatch(postImages(formData)),
        deleteImage: (id: string) => {
            return dispatch(deleteImage(id)).then(() => {
                dispatch(fetchImages());
            });
        },
        updateImage: (payload: types.UpdateImage) => {
            return void dispatch(updateImage(payload)).then(() => {
                dispatch(fetchImages());
            });
        },
    };
};
