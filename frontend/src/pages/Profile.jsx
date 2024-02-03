import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "./Profile.css"; // Import your custom CSS file

const Profile = () => {
  const { user } = useContext(AuthContext);
  const id = user._id;

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

  const handleEdit = () => {
    // Implement the logic for editing the user profile
    console.log("Editing user profile");
  };

  const handleDelete = () => {
    // Implement the logic for deleting the user profile
    console.log("Deleting user profile");
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {profileData ? (
        <div className="profile-info">
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          {/* Add other profile information here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {profileData && (
        <div className="profile-buttons">
          <button onClick={handleEdit} className="edit-button">
            Edit Profile
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
