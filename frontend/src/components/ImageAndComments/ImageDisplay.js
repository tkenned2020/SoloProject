import { useEffect } from "react";
import { getImages } from "../../store/image";
import { useSelector, useDispatch } from "react-redux";

export default function ImageDisplay (props){

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const image = useSelector(state => state.image)
    const imageArr = Object.values(image);


 useEffect(() => {
     if(sessionUser) dispatch(getImages(sessionUser.id))

 }, [dispatch, sessionUser])

    return(
        <div>
        {imageArr.map(val => (<div><h6>{val.content}</h6>
                                <img src={val.imageUrl} alt={""} />
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
