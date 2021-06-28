import './ImageContainer.css';
import {  useEffect } from "react";
import {deleteImage, getImages, setImages} from '../../store/image';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function ImageContainer ({image}){
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const images = useSelector(state => state.image)
    const imageArr = Object.values(images);

    console.log("this is imageArr",imageArr)
    console.log("this is imageArr",imageArr.imageUrl)

    useEffect(() => {
        if(sessionUser) dispatch(getImages(sessionUser.id))
    }, [dispatch, sessionUser])


    const changeBtn = (e) => history.push(`/change/${image.id}`);

    const thoughtsBtn = (e) => history.push(`/thoughts/${image.id}`);

    const destructionBtn = (e) => {
        e.preventDefault()
        dispatch(deleteImage(image.id))
        history.push('/user')
    };

    return (
    <div className='image-container'>
     {imageArr.map(val => (<div><h6>{val.content}</h6>
         <img className="images" src={val.imageUrl} alt={""}></img>
         <button className='change-Btn' onClick={changeBtn} type="submit">Change</button>
         <button className='destruction-Btn' onClick={destructionBtn} type="submit">Destruction</button>
         <button className='thoughts-Btn' onClick={thoughtsBtn} type="submit">Your Thoughts</button>
         </div>))}
    </div>
    )
};
