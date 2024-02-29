import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const id = user._id;
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
          headers: {
            "content-type": "application/json",
          },
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.success) {
          setProfileData(data.data);
        } else {
          console.error("Error fetching user profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user, id]);

  const handleDelete = async (updateUserState) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        alert("User deleted successfully");
        updateUserState();
        navigate("/login");
      } else {
        console.error("Error deleting user:", data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {profileData ? (
        <div className="profile-info">
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {profileData && (
        <div className="profile-buttons">
          <button
            onClick={() => handleDelete(() => {})}
            className="delete-button"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
