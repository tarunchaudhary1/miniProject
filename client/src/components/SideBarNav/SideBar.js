import styled from "styled-components";
import { SideBarDataAdmin } from "./SideBarDataAdmin";
import { SideBarDataUser } from "./SideBarDataUser";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "./Style.css";
import { useTheme, useThemeUpdate } from "../../Context";
import * as BsIcons from "react-icons/bs";

import Dropdown from "react-bootstrap/Dropdown";
// import { useEffect } from "react";

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const theme = Boolean(useTheme());
  const toggleTheme = useThemeUpdate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userid");
    // localStorage.removeItem("currQuizId");
    // window.location.reload();
    window.location = "/";
  };

  let user = 0,
    admin = 0;
  if (localStorage.getItem("token")) {
    if (localStorage.getItem("token").endsWith("/user")) {
      user = localStorage.getItem("token");
    } else if (localStorage.getItem("token").endsWith("/admin")) {
      admin = localStorage.getItem("token");
    }
  }

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  return (
    <div
      className="main_content"
      style={{
        marginTop: "5rem",
      }}
    >
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav
          className="navbar fixed-top "
          style={{
            background: "#212529",
            // color: "white",
            // border: "solid blue",
            // marginBottom: "3rem",
            padding: "1rem",
          }}
        >
          <a className="navbar-brand text-white ps-4" href="/dashboard">
            <h4>EEP</h4>
          </a>
          <div className="upper_right">
            <div className="Themebody">
              {theme && (
                <input
                  type="checkbox"
                  defaultChecked="true"
                  className="checkbox"
                  id="checkbox"
                  onChange={() => {
                    toggleTheme(!theme);
                  }}
                />
              )}
              {!theme && (
                <input
                  type="checkbox"
                  className="checkbox"
                  id="checkbox"
                  onChange={() => {
                    toggleTheme(!theme);
                  }}
                />
              )}
              <label htmlFor="checkbox" className="label">
                <BsIcons.BsSun className="fas fa-moon" />
                <BsIcons.BsFillMoonFill className="fas fa-sun" />
                <div className="ball" />
              </label>
            </div>
            <div>
              <Dropdown className="Newbutton" id="Button_1">
                <Dropdown.Toggle variant="dark"></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">My Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
        <div className="side_grid">
          <div className="side_empty">05</div>
          <nav className="side_nav">
            <SidebarWrap>
              {admin
                ? SideBarDataAdmin.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                  })
                : ""}
              {user
                ? SideBarDataUser.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                  })
                : ""}
              {/* <h2>Hello</h2> */}
            </SidebarWrap>
          </nav>
          <div className="bot_Nav">
            {admin ? "Logged in as ADMIN: " + firstName + " " + lastName : ""}
            {user ? "Logged in as USER: " + firstName + " " + lastName : ""}
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
