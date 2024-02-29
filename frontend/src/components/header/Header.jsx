import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  // {
  //   path: "/about",
  //   display: "About",
  // },
  {
    path: "/tours",
    display: "Tours",
  },
];

const navUserLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/userbookings",
    display: "My bookings",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/profile",
    display: "My profile",
  },
];

const navAdminLinks = [
  {
    path: "/adminHome",
    display: "Dashboard",
  },
  {
    path: "/users",
    display: "Users",
  },
  {
    path: "/toursadmin",
    display: "Tours",
  },
  {
    path: "/bookings",
    display: "Bookings",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("user");

  const logout = () => {
    Cookies.remove("accessToken");
    dispatch({ type: "LOGOUT" });

    navigate("/");
    window.location.reload();
  };

  const getUserRole = () => {
    try {
      setUserRole(user?.role);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    getUserRole();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, [user, getUserRole]);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {(() => {
                  if (userRole === "admin") {
                    return navAdminLinks.map((item, index) => (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "active__link" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    ));
                  } else if (userRole === "user") {
                    return navUserLinks.map((item, index) => (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "active__link" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    ));
                  } else {
                    return navLinks.map((item, index) => (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          className={(navClass) =>
                            navClass.isActive ? "active__link" : ""
                          }
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    ));
                  }
                })()}
              </ul>
            </div>
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
