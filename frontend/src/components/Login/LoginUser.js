import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Style.css";
import { Button } from "react-bootstrap";
import { useTheme } from "../../Context";

const Login = () => {
  const theme = Boolean(useTheme());
  const themeClassName = theme ? "login_dark" : "login";
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/authUser";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", `${res.data}/user`);
      localStorage.setItem("userid", `${res.userInfo._id}`);
      localStorage.setItem("firstName", `${res.userInfo.firstName}`);
      localStorage.setItem("lastName", `${res.userInfo.lastName}`);

      window.location = "/dashboard";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={`${theme ? "mybody_dark" : "mybody"}`}>
      <div className={themeClassName}>
        <h2 id="login_h2">Login as User</h2>
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="form-group was-validated">
            <label className="form-label mx-3 mt-4" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="form-control"
              autoComplete="off"
            />
          </div>
          <div className="form-group was-validated">
            <label className="form-label mx-3 mt-4" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="form-control"
              autoComplete="off"
            />
          </div>
          {error && <div className="error_msg">{error}</div>}
          <input
            className={`${theme ? "btn w-100" : "btn w-100"}`}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
