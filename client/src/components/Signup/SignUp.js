import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css"


const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://backend.healthynomad.xyz:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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

		<div className="SingUpbody">
			<div className="signup">
				<h2 className="text-center">Create Account</h2>
				<form className="needs-validation" onSubmit={handleSubmit}>
					<div className="form-group was-validated">
						<label className="form-label">First Name</label>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="form-control"
						/>
						
					</div>
					<div className="form-group was-validated">
						<label className="form-label">Last Name</label>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="form-control"
						/>
					</div>
					<div className="form-group was-validated">
						<label className="form-label" htmlFor="email">Email address</label>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="form-control"
						/>
					</div>
					<div className="form-group was-validated">
						<label className="form-label" htmlFor="password">Password</label>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="form-control"
						/>
					</div>
					{error && <div className="error_msgs">{error}</div>} <br/>
					<input className="btn btn-success w-100" type="submit"  />
				</form>
			</div>
		</div>

	);
};

export default Signup;
