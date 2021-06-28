import React from "react";
import { NavLink,  } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import ImageUpload from "../ImageAndComments/ImageUpload";

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks =
    <>
      <div className="uploadBtn">
          <div>
            <NavLink to="/upload">
              Upload
            </NavLink>
          </div>
      </div>
      <div>
        <ProfileButton user={sessionUser} />
      </div>;
    </>
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink className="signup" to="/signup">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
  <div>
    <ul>
      <li>
        <NavLink exact to="/">
          CelestialAnime
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  </div>
  );
}
