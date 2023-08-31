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
import { Images, Image } from '../../../bus/images/types';

// PropTypes
type PropTypes = {
    data: any; // Images
}

export const ImageGallery: FC<PropTypes> = ({ data }) => {
    const FavImage = (item: Image) => {
        item.isFavourite = !item.isFavourite;
        console.log('click', item._id);
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
                                    onClick = { () => { console.log('delete', item._id); } }>
                                    <DeleteOutlineOutlinedIcon sx = {{ color: 'white' }} />
                                </IconButton>
                                <IconButton
                                    aria-label = { `info about ${item.title}` }
                                    sx = {{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    onClick = { () => { FavImage(item); } }>
                                    <StarBorderOutlinedIcon sx = { item.isFavourite ? { color: 'yellow' } : { color: 'white' } } />
                                </IconButton>

                                <IconButton
                                    aria-label = { `info about ${item.title}` }
                                    sx = {{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    onClick = { () => { FavImage(item); } }>
                                    <InfoIcon sx = {{ color: 'white' }} />
                                </IconButton>
                            </>
                        }
                        title = { item.title ? item.title : 'Image Title' }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};
