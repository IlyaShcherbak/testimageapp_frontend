// Core
import React, { FC } from 'react';

// Bus
import { useImages } from '../../../bus/images';

// Components
import { ErrorBoundary, ImageGallery } from '../../components';
import { Button, Box, Typography } from '@mui/material';

// Styles
import { Container } from './styles';

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

    if (images && images[ 0 ] === null) {
        return <div>No Data</div>;
    }

    return (
        <Container>
            <Typography
                align = 'center'
                component = 'h1'
                fontSize = { 40 }
                variant = 'h1'>
                Image Gallery
            </Typography>;
            <Box sx = {{
                position: 'fixed',
                top:      '85%',
                left:     '90%',
                zIndex:   999,
            }}>
                <Button
                    style = {{
                        position:      'relative',
                        fontSize:      '20px',
                        textTransform: 'uppercase',
                    }}
                    variant = 'contained'>
                    <input
                        multiple
                        style = {{
                            position:     'absolute',
                            opacity:      0,
                            width:        '100%',
                            height:       '100%',
                            top:          0,
                            bottom:       0,
                            left:         0,
                            right:        0,
                            marginBottom: 30,
                        }}
                        type = 'file'
                        onChange = { onChange }
                    />

                    Add Image
                </Button>
            </Box>

            <ImageGallery
                data = { images }
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
