import {React,useEffect,useState} from "react";
import AboutImage from "../About/img_online.svg";
import "./Style.css";
import { Link } from "react-router-dom";
import "../Questions/InnerLayout.css";
import { MdMargin } from "react-icons/md";

const AboutUs = () => {

  // const [theme,setTheme] = useState(false);
  // const [styledTheme,setStyledTheme] = useState({})
  
  // useEffect(() => {
  //   setStyledTheme({
  //     backgroundColor : theme ? "#444444" : "#f5f2e9",
  //     color : theme ? "white" : "black"
  //   })
  //   // change background color with a random color
  //   document.body.style = "background: #f5f2e9;";
  // },[theme]);

  return (
    <>
      
      <div className="bgcolor">
      <div className="nav_bg">
        <div className="inner_bg">
          <Link
            className="navbar-brand"
            style={{
              fontSize: 25,
              color: "rgb(42,144,222)",
            }}
            to="/"
          >
            Employee Examination Portal
          </Link>
        </div>
      </div>
        {/* <h5 className="header-top">About Us</h5> */}
        <div className="grid-container">
          <div className="g1">
            <p style={{ fontSize: 20 }}>
              Welcome to our online assessment platform!
              <br />
              <br />
              We understand the need for organizations to assess and evaluate
              their employees' skills and knowledge effectively and efficiently.
              That's why we have created this platform to meet those needs. Our
              platform is designed to provide a comprehensive solution for
              organizations to assess their employees and track their progress
              over time.
              <br />
              <br />
              With our platform, you can create custom assessments tailored to
              your organization's needs, as well as choose from a library of
              pre-made assessments in various fields and skill levels. The
              platform's intuitive interface and advanced reporting features
              make it easy for you to track and analyze the results of your
              assessments.
              <br />
              <br />
              We believe that continuous learning and assessment is the key to
              success for any organization, and our platform is the perfect tool
              to support that goal. We are dedicated to providing the best
              experience for our users and are continuously improving our
              platform to meet their evolving needs.
              <br />
              <br />
              Thank you for choosing our platform and we look forward to helping
              you enhance the skills and knowledge of your employees.
            </p>
          </div>
          <div className="g1">
            <div className="imgDiv">
              <img className="imgDiv2" src={AboutImage} alt="About Image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
