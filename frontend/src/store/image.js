import { csrfFetch } from "./csrf";

const SET_IMAGE = "image/setImage";
const Delete_IMAGE = "image/deleteImage";

const setImage = () => { //action-creator
    return {
        type: SET_IMAGE,
        payload:
    }
}

export const getImages = () => async (dispatch) => {
    const res = await csrfFetch('/api/images');
    const images = res.json();
    dispatch(setImage());
    return images;
}

//define an initialState
const initialState = {};

//define A reducer
export default function imageReducer (state = initialState, action) {
    switch (action.type) {
        case SET_IMAGE:
            const allImages = {};
            action.images.forEach( e => allImages[image.id] = image );
        return {
            ...state,
            ...allImages,
        };
        default: return state;
    }
}
