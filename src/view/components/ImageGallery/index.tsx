// Core
import React, { FC, useCallback, useState } from 'react';

// Bus
import { useTogglesRedux } from '../../../bus/client/toggles';
import { useImages } from '../../../bus/images';

// Components
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { IconButton } from '@mui/material';
import { ImageInfoModal } from '../ImageInfoModal';

// Icons
import InfoIcon from '@mui/icons-material/Info';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Types
import { Image, ImagesState } from '../../../bus/images/types';

// PropTypes
type PropTypes = {
    data: ImagesState;
    deleteImage: (id:string) => void;
}

export const ImageGallery: FC<PropTypes> = ({ data, deleteImage }) => {
    const { setToggleAction } = useTogglesRedux();
    const { updateImage } = useImages();

    const [ selectedImage, setSelectedImage ] = useState<Image | null>(null);

    const FavImage = useCallback((item: Image) => {
        const newItem = {
            ...item,
            isFavourite: item.isFavourite ? !item.isFavourite : true,
        };
        console.log('item.isFavourite >>> ', item.isFavourite);

        let formData = new FormData();
        if (newItem) {
            const keysCurrentImage = Object.keys(newItem);
            const valuesCurrentImage = Object.values(newItem);

            keysCurrentImage.forEach((keyCurrentImage, index) => {
                formData.append(keyCurrentImage, String(valuesCurrentImage[ index ]));
            });

            updateImage({
                _id: newItem._id,
                formData,
            });
        }
    }, []);

    const DelImage = (item: Image) => {
        deleteImage(item.public_id);
    };

    const ShowInfo = (item: Image) => {
        console.log('info', item);
        setSelectedImage(item);
        setToggleAction({
            type:  'isImageInfoModalOpen',
            value: true,
        });
    };

    if (data === null) {
        return <div>No Data</div>;
    }

    return (
        <ImageList sx = {{
            width:  1200,
            margin: 'auto',
        }} >
            {data && data.map((item: Image) => (
                <ImageListItem key = { item.public_id }>
                    <img
                        alt = { item.imageUrl }
                        src = { item.imageUrl }
                    />
                    <ImageListItemBar
                        actionIcon = {
                            <>
                                <IconButton
                                    aria-label = { `info about ${item.title}` }
                                    sx = {{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    onClick = { () => {
                                        DelImage(item);
                                    } }>
                                    <DeleteOutlineOutlinedIcon sx = {{ color: 'white' }} />
                                </IconButton>

                                <IconButton
                                    aria-label = { `info about ${item.title}` }
                                    sx = {{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    onClick = { () => { FavImage(item); } }>
                                    <StarBorderOutlinedIcon style = { item.isFavourite ? { color: 'yellow' } : { color: 'white' } } />
                                </IconButton>

                                <IconButton
                                    aria-label = { `info about ${item.title}` }
                                    sx = {{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    onClick = { () => { ShowInfo(item); } }>
                                    <InfoIcon sx = {{ color: 'white' }} />
                                </IconButton>
                            </>
                        }
                        title = { item.title ? item.title : 'Title' }
                    />
                </ImageListItem>
            ))}
            {selectedImage && (
                <ImageInfoModal image = { selectedImage }/>
            )}
        </ImageList>
    );
};
