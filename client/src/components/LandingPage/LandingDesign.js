import React from 'react'
import Image_1 from '../About/img_textbook.svg'
import "./Style.css"
import { Link } from "react-router-dom";
import "../Questions/InnerLayout.css"
import { useTheme, useThemeUpdate } from "../../Context";


function LandingDesign() {

  const theme = Boolean(useTheme());
  return (
    <section id="header" className="d-flex align-items-center nav-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-11 mx-auto">
            <div className="row">
              <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-l d-flex justify-content-center flex-column">
                <p style={{ fontSize: 70 }}>
                  {" "}
                  Welcome to <br />
                  <strong
                    className="brand-name"
                    style={{ color: "rgb(42,144,222)" }}
                  >
                    EEP
                  </strong>
                </p>
                <p style={{ fontFamily: "sh", fontSize: "1.2rem" }}>
                  Create and Manage Online Quizzes & Exams with Proctoring
                  Features
                </p>
                <div className="display-row">
                  <div className="my-3">
                    <Link to="/login_admin" className={`${theme ? "button_dark" : "button_light"}`}>
                      Login as Admin
                    </Link>
                  </div>
                  <div className="m-3">
                    <Link to="/login_user" className={`${theme ? "button_dark" : "button_light"}`}>
                     Login as User
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2 header-img">
                <img className="img_style" src={Image_1} alt="Image_1.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingDesign