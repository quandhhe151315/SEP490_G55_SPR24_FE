import React, { useEffect, useState } from "react";
import Appbar from "../components/Homepage/Appbar";
import GetInformationJWT from "../components/JWT/GetInformationJWT";
import Layoutspacing from "../components/Layoutspacing";
import Footer from "../components/Footer/Footer";

function HomePage() {

  return (
    <div>
        <Appbar/>
        <h1>Trang chủ</h1>
        <Footer/>
    </div>
  );
}

export default HomePage;
