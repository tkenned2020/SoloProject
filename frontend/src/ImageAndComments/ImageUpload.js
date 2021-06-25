import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";



export default function ImageUpload(props) {
  // const [newImage, setNewImage] = useState([]);
  // const history = useHistory();
  // const getFile = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImgUrl(file);
  //   }
  // };

  const CancelClk = e => {
    e.preventDefault();

  }
  return (
    <div>
      <form>
        <h5>Add an image!</h5>
        <input type="text" name="image" placeholder="add an image"></input>
        <button type="submit">Upload the image</button>
      </form>
    </div>
  );
}
