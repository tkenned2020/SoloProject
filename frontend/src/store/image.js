import { csrfFetch } from "./csrf";

const SET_IMAGE = "image/setImage";
const SET_IMAGES = "image/get"
const DELETE_IMAGE = "image/deleteImage";

const setImage = (data) => { //action-creator
    return {
        type: SET_IMAGE, data
    }
}

const setImages = (data) => {//action-creator
    return {
        type: SET_IMAGES, data
    }
}

export const uploadImage = (image, userId) => async(dispatch) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId);
    const res = await csrfFetch("/api/image", {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if(res.ok){
        const image = await res.json();
        dispatch(setImage(image))
    }
};

export const getImages = (id) =>  async (dispatch) => {
    const res = await csrfFetch(`/api/image/${id}`);
    const data = await res.json();
    dispatch(setImage(data.image));
    return data.image;
}

export const editImage = (image, imageId) => async(dispatch) => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await csrfFetch(`/api/image/${imageId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: formData,
    });
    if (res.ok){
        const image = await res.json();
        dispatch(setImage(image));
    }
};

export const deleteImage = (imageId) => async(dispatch) => {
    const res = await csrfFetch(`/api/image/${imageId}`, {
        method: "DELETE"
    });
    if(res.ok){
        const images = await res.json();
        dispatch(setImages(images))
    }
}

//define an initialState
const initialState = {};

//define A reducer
export default function imageReducer (state = initialState, action) {
    switch (action.type) {
        case SET_IMAGE:
            const images = {};
            action.data.forEach( (image) => images[image.id] = image );
        return {
            ...state,
            ...images,
        };
        case SET_IMAGES:
            const allImages = {};
            action.data.forEach( image => {
                allImages[image.id] = image
            });
            return {
                ...state,
                ...allImages
            }
        default: return state;
    }
}
