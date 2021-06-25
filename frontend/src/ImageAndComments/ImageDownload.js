import { useState, useEffect } from "react";
import { getImages } from "../store/image";
import { useSelector, useDispatch } from "react-redux";

export default function ImageDownload (props){

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const imageState = useSelector(state => state.imageState)
    const imageArr = Object.values(imageState);
    const imageArr1 = Object.keys(imageArr)


    console.log("......",imageArr)
    console.log("......",sessionUser)
    console.log(imageArr.map(word => console.log(word)))

 useEffect(() => {
     if(sessionUser) dispatch(getImages(sessionUser.id))


 }, [dispatch, sessionUser])

    return(
        <div>


        {imageArr.map(val => (<div><h3>{val.content}</h3>
                                <img src={val.imageUrl} />
                                <button>add a comment</button>
                                <button>edit</button>
                                <button>delete</button>
            </div>))}
        </div>
    )
}

/*
get the user via session.user
useEffect to dispatch the getimages(id)
create userSelector that grabs image slice of state
convert images into an array
map the elements inside of the array of images
*/
