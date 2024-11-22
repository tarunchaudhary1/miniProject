import styled from "styled-components";
import { SideBarDataAdmin } from "./SideBarDataAdmin";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "./Style.css";
import * as BsIcons from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const handleLogout = () => {
    window.location = "/";
  };

  return (
    <div className="main_content" style={{ marginTop: "5rem" }}>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav
          className="navbar fixed-top"
          style={{
            background: "#212529",
            padding: "1rem",
          }}
        >
          <a className="navbar-brand text-white ps-4" href="/dashboard">
            <h4>DEP</h4>
          </a>
          <div className="upper_right">
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
              {SideBarDataAdmin.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </nav>
          <div className="bot_Nav">Logged in as ADMIN: John Doe</div>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
