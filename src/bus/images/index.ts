// Core
import { useEffect } from 'react';

// Tools
import { useSelector } from '../../tools/hooks'; /* Typed selector */

import { useImagesThunk } from './thunk';

export const useImages = () => {
    // MarkerGen api hook
    const { fetchImages, postImages, deleteImage, updateImage } = useImagesThunk();  /* Thunk api hook */

    const images = useSelector((state) => state.images);

    useEffect(() => {
        fetchImages();
    }, []);

    return {
        images,
        updateImage,
        postImages,
        deleteImage,
    };
};
