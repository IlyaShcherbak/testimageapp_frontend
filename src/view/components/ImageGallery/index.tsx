// Core
import React, { FC } from 'react';

// MUI Components
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { IconButton } from '@mui/material';

// Icons
import InfoIcon from '@mui/icons-material/Info';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Types
import { Image, Images } from '../../../bus/images/types';

// PropTypes
type PropTypes = {
    data: Images;
    deleteImage: (id:string) => void;
}

export const ImageGallery: FC<PropTypes> = ({ data, deleteImage }) => {
    const FavImage = (item: Image) => {
        item.isFavourite = !item.isFavourite;
        console.log('fav', item._id);
    };

    const DelImage = (item: Image) => {
        deleteImage(item.public_id);
    };


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
                                    onClick = { () => { console.log('info', item); } }>
                                    <InfoIcon sx = {{ color: 'white' }} />
                                </IconButton>
                            </>
                        }
                        title = { item.title ? item.title : 'Title' }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
