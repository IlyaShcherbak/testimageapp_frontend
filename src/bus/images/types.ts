// State
export type Image = {
    _id: string
    imageUrl: string;
    public_id: string;
    title: string;
    isFavourite: boolean;
}

export interface UpdateImage extends Pick<Image, '_id'> {
    formData: FormData;
}

export type Images = Array<Image>

export type ImagesState = Images | null

