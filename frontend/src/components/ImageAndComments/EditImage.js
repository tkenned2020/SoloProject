import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {editImage, getImages} from '../../store/image';
import ImageContainer from './ImageContainer';
import './EditImage.css';

export default function EditImages (){
    const images = useSelector((state) => Object.values(state.images));
    const user = useSelector((state) => state.session.user);
    const {imageId} = useParams();
    const dispatch = useDispatch();
    const [img, setImg] = useState();
    const history = useHistory();
    const singleImage = images.find( image => +imageId === image.id);

    useEffect(() => {
        if(user) {
        dispatch(getImages(user.id))
        } else {
        history.push('/')
        }
    },[user, dispatch, history])

    const list = useSelector((state) => {
        return state.images
    })

    const newList = []
    for (let key in list) {
        newList.push(list[key])
    }

    if (!user) return null;
    const editImg = (e) => {
      setImg(e.target.files[0]);
  };
      const submitHandler = (e) => {
      e.preventDefault();
      dispatch(editImage(img, imageId));
      history.push('/upload')
  };
    return (
    <>
      <form onSubmit={submitHandler}>
        <label className="anime-file">What's the Vibes
            <input className="animeUpload"
            type="file"
            onChange={editImg}
            />
        </label>
        <button className="uploadBtn" type="submit">Let's switch the Vibes</button>
        <div>
          <div className="title-container">
            <h3 className="title">
                We need adjustments?)
            </h3>
          </div>
        </div>
      </form>
      <ImageContainer photo={singleImage} user={user} newList={newList} />
      {/* {Object.values(photos).map(photo =>
        <PhotoCard photo={photo} user={user} newList={newList}/>
      )} */}
      {/* {uploadedImage && <img src={uploadedImage} alt="test" />} */}
    </>
  );
};
