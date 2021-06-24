import { useState, useEffect } from "react";
import { getImages } from "./store/image";
import { useSelector } from "react-redux";

export default function ImageDownload (props){


    return(
        <div>thank you JD</div>
    )
}

/*
get the user via session.user
useEffect to dispatch the getimages(id)
create userSelector that grabs image slice of state
convert images into an array
map the elements inside of the array of images
*/
