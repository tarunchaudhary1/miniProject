import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import SideBar from "../SideBarNav/SideBar";
import "../Questions/InnerLayout.css";
import { useTheme } from "../../Context";

const User = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setAlert] = useState(<></>);

  const theme = Boolean(useTheme());
  const themeClassName = theme
    ? "addQuestionContainer_dark"
    : "addQuestionContainer";

  const backCol = theme ? "#444444" : "#ffffff";
  const textCol = theme ? "white" : "black";
  document.body.style = "background: " + backCol + ";" + "color: " + textCol;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      setAlert(
        <Alert variant="success">
          <Alert.Heading>User addition successful</Alert.Heading>
          <p>This is a static demonstration page</p>
          <hr />
        </Alert>
      );
      setfirstName("");
      setlastName("");
      setemail("");
      setpassword("");
    }
  };

  return (
    <>
      <SideBar />
      <h1>
        <b>Add Users</b>
      </h1>
      <div className="format">
        <div className="form-group" autoComplete="off" autoSave="off">
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            placeholder="Please enter First Name"
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            placeholder="Please enter Last Name"
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="email"
            className="form-control"
            autoComplete="off"
            autoSave="off"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Please enter email"
          />
        </div>
        <div className="form-group mt-3">
          <input
            type="password"
            className="form-control"
            autoComplete="off"
            autoSave="off"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Please enter password"
          />
        </div>
        {alert}
        <button
          type="submit"
          className={theme ? "button_dark_success" : "button_light_success"}
          onClick={handleSubmit}
        >
          Add User
        </button>
      </div>
    </>
  );
};

export default User;
