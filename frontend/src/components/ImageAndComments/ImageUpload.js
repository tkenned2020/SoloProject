import {  useEffect } from "react";
// useState,
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { uploadImage, getImages, setImages } from "../../store/image";
// getImage,

export default function ImageUpload(props) {
  // const [newImage, setNewImage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const images = useSelector( state => state.image)

  useEffect(() => {
    if(sessionUser) dispatch(getImages(sessionUser.id))

}, [dispatch, sessionUser])


  if(!sessionUser) return null;
  const updateImage = e => {
    setImages(e.target.files[0])
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(uploadImage(images, sessionUser.id));
    history.push("/user")
  }
  // const getFile = (e) => {
  //   const file = e.target.files[0];
  //   if  (file) {
  //     setImgUrl(file);
  //   }
  // };


  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <h5>Add an image!</h5>
        <input type="file"
        name="image"
        onChange={updateImage}
        placeholder="add an image"></input>
        <button type="submit">Upload the image!</button>
      </form>
    </div>
  );
}
