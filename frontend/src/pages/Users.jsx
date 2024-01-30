import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import "./users.css";
import { Button } from "reactstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteValue = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      alert("User deleted");

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Update the state to reflect the changes
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-card-container">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h2>{user.username}</h2>
              <p>Email: {user.email}</p> <br /> <br />
              <Button variant="contained" onClick={() => deleteValue(user._id)}>
                Delete
              </Button>
              {/* &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; */}
              {/* <Button variant="contained">Update</Button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
