import { Button, Container, Spinner } from "react-bootstrap";
import {
  FaCheck,
  FaConnectdevelop,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import useFetch from "../Hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userId } = useParams();
  const { data: profile, isLoading } = useFetch(`/profile/user/${userId}`);
  const user = useSelector((store) => store.user);
  console.log(profile);
  return isLoading ? (
    <div id="spinner" className="vh-100 fixed">
      <Spinner className="spinner" />
    </div>
  ) : profile ? (
    <section id="profile" className="my-5">
      <Container>
        <div className="d-flex gap-2">
          <Button as={Link} to="/profiles" variant="light">
            Back to Profiles
          </Button>
          {userId === user._id ? (
            <Button as={Link} to="/edit-profile" variant="dark">
              Edit Profile
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className="p-5 text-center bg-info text-white my-3">
          <img src={profile.user.avatar} alt="" className="rounded-circle" />
          <h1 className="my-3 display-5 fw-bold">{profile.user.name}</h1>
          <h3>
            {profile.status}
            {profile.company ? ` at ${profile.company}` : ""}
          </h3>
          <p>{profile.location}</p>
          <div className="d-flex gap-2 justify-content-center">
            {profile.social.youtube ? (
              <Link to={profile.social.youtube} className="fs-1 text-light">
                <FaYoutube />
              </Link>
            ) : (
              ""
            )}
            {profile.social.twitter ? (
              <Link to={profile.social.twitter} className="fs-1 text-light">
                <FaTwitter />
              </Link>
            ) : (
              ""
            )}
            {profile.social.instagram ? (
              <Link to={profile.social.instagram} className="fs-1 text-light">
                <FaInstagram />
              </Link>
            ) : (
              ""
            )}
            {profile.social.linkedin ? (
              <Link to={profile.social.linkedin} className="fs-1 text-light">
                <FaLinkedin />
              </Link>
            ) : (
              ""
            )}
            {profile.social.facebook ? (
              <Link to={profile.social.facebook} className="fs-1 text-light">
                <FaFacebook />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="text-center bg-light border border-1 p-5">
          <h3 className="text-info ">{profile.user.name}'s Blog</h3>
          <p>{profile.bio}</p>
          <hr />
          <h3 className="text-info">Skill Set</h3>
          <ul className="list-unstyled d-flex gap-3 justify-content-center">
            {profile.skills?.map((skill, index) => {
              return (
                <li key={index}>
                  <FaCheck /> {skill}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  ) : (
    <></>
  );
};

export default Profile;
