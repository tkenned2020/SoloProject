export default function ImageUpload (){
    // action="upload/post"
    const fileHandler = e => console.log(e);
    return(
        <body>
        <p>Image Upload</p>
        <form method="post"  enctype="multipart/form-data">
          <input type="file"
          name="image" />
         
          <button onClick={} type="submit" name="upload">Upload</button>
        </form>
    </body>
    )
}
