import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// import ImageDisplay from "./components/ImageAndComments/ImageDisplay"
import ImageUpload from "./components/ImageAndComments/ImageUpload"
import ImageContainer from "./components/ImageAndComments/ImageContainer"
import Comments from "./components/ImageAndComments/Comments";
import EditImages from "./components/ImageAndComments/EditImage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>

          <Route path="/user">
            <ImageContainer />
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path="/upload">
            <ImageUpload/>
          </Route>

          <Route path="/modify/:imageId">
            <EditImages/>
          </Route>

          <Route path="/thoughts/:imageId">
            <Comments/>
          </Route>

          </Switch>
      )}
    </>
  );
}

export default App;
