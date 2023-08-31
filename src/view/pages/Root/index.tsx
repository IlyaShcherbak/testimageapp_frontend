// Core
import React, { FC } from 'react';

// Bus
import { useImages } from '../../../bus/images';

// Components
import { ErrorBoundary, ImageGallery } from '../../components';

// Elements
// import { HelloBurst } from '../../elements';

// Styles
import { Container } from './styles';

// Types
import { Images } from '../../../bus/images/types';

// Constants
const types: Array<string> = [ 'image/png', 'image/jpeg', 'image/gif' ];

const Root: FC = () => {
    const { images, postImages, deleteImage } = useImages();

    const onChange = (event: any) => {
        const errors: Array<string> = [];
        let formData = new FormData();
        const files = Array.from(event.target.files);

        files.forEach((file: any, i) => {
            if (types.every((type) => file.type !== type)) {
                errors.push(`'${file.type}' is not a supported format`);
            }

            if (file.size > 1000000) {
                errors.push(`Name:'${file.name}', size:'${file.size}' is too large, please pick a smaller file`);
            }

            formData.append(`${i}`, file);
        });

        if (errors.length > 0) {
            return errors.forEach((error) => console.error(error));
        }

        postImages(formData);
    };

    console.log('images', images);

    return (
        <Container>
            {/* <HelloBurst /> */}
            <input
                multiple
                type = 'file'
                onChange = { onChange }
            />
            <ImageGallery
                data = { images as Images }
                deleteImage = { deleteImage }
            />
        </Container>
    );
};

export default () => (
    <ErrorBoundary>
        <Root />
    </ErrorBoundary>
);
