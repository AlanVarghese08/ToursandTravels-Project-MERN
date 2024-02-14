import React, { useState, useContext, useEffect } from "react";
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const [userRole, setUserRole] = useState(""); // New state for userRole

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async () => {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        dispatch({ type: "LOGIN_FAILURE", payload: result.message });
        return;
      }

      const fetchedUserRole = result.role;

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });

      setUserRole(fetchedUserRole);
      sessionStorage.setItem("userRole", fetchedUserRole);

      if (fetchedUserRole === "user") {
        navigate("/home");
      } else if (fetchedUserRole === "admin") {
        navigate("/adminHome");
      } else {
        navigate("/");
      }
      window.location.reload();
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  const handleBrowserBack = (event) => {
    event.preventDefault();

    // Redirect based on the stored userRole state
    if (userRole === "user") {
      navigate("/home");
    } else if (userRole === "admin") {
      navigate("/adminHome");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  <img src={loginImg} alt="" />
                </div>
                <div className="login__form">
                  <div className="user">
                    <img src={userIcon} alt="" />
                  </div>
                  <h2>Login</h2>

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button
                      className="btn secondary__btn auth__btn"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Form>
                  <p>
                    Don't have an account? <Link to="/register">Create</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
