import { csrfFetch } from "./csrf";

const SET_IMAGE = "image/setImage";
const DELETE_IMAGE = "image/deleteImage";

const setImage = (data) => { //action-creator
    return {
        type: SET_IMAGE,
        payload: data,
    }
}

export const getImages = (id) =>  async (dispatch) => {
    const res = await csrfFetch(`/api/image/${id}`);
    const data = await res.json();
    dispatch(setImage(data.image));

    return data.image;
}

//define an initialState
const initialState = {};

//define A reducer
export default function imageReducer (state = initialState, action) {
    switch (action.type) {
        case SET_IMAGE:
            const allImages = {};
            action.payload.forEach( (image) => allImages[image.id] = image );
        return {
            ...state,
            ...allImages,
        };
        default: return state;
    }
}


