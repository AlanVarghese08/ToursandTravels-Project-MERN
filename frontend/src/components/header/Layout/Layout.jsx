import React from "react";

import Header from "../Header";

import { Footer } from "../../Footer/Footer";
import Router from "../../../router/Router";

const Layout = () => {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
};

export default Layout;
