// Core
import { FC, useCallback, useState } from 'react';

// Redux
import { useTogglesRedux } from '../../../bus/client/toggles';
import { useImages } from '../../../bus/images';

// Components
import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';

// Types
import { Image } from '../../../bus/images/types';

// PropTypes
type PropTypes = {
    image: Image;
}

export const ImageInfoModal: FC<PropTypes> = ({ image }) => {
    const [ currentImage, setCurrentImage ] = useState<Image | null>(image);
    const { togglesRedux: { isImageInfoModalOpen }, setToggleAction } = useTogglesRedux();

    const { updateImage } = useImages();

    const onCloseHandler = useCallback(() => {
        let formData = new FormData();
        console.log('currentImage >>> ', currentImage);
        if (currentImage) {
            const keysCurrentImage = Object.keys(currentImage);
            const valuesCurrentImage = Object.values(currentImage);

            keysCurrentImage.forEach((keyCurrentImage, index) => {
                formData.append(keyCurrentImage, String(valuesCurrentImage[ index ]));
            });

            updateImage({
                _id: currentImage._id,
                formData,
            });
        }
        setToggleAction({
            type:  'isImageInfoModalOpen',
            value: false,
        });
    }, [ setToggleAction, currentImage ]);

    return (
        <Dialog
            open = { isImageInfoModalOpen }
            onClose = { onCloseHandler }>
            <DialogTitle>
                Image Info:
            </DialogTitle>
            <DialogContent>
                <Stack
                    direction = 'row'
                    gap = '24px'
                    mb = '35px'>
                    <TextField
                        defaultValue = { image.title }
                        id = 'outlined-basic'
                        label = 'Title'
                        variant = 'outlined'
                        onChange = { (event) => setCurrentImage((prevState) => prevState && {
                            ...prevState,
                            title: event.target.value,
                        }) }
                    />
                    <TextField
                        disabled
                        defaultValue = { image.imageUrl }
                        id = 'outlined-basic'
                        label = 'Source'
                        variant = 'outlined'
                    />
                </Stack>
                <Button
                    onClick = { onCloseHandler }>
                    Save
                </Button>
            </DialogContent>
        </Dialog>
    );
};

