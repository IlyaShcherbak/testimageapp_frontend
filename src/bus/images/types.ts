// State
export type Image = {
    _id: string
    imageUrl: string;
    public_id: string;
}

export type Images = Array<Image>

export type ImagesState = Images | null

