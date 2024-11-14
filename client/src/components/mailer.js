import React from 'react';
import emailjs from 'emailjs-com';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import { useState } from 'react';

const Mailer = () => {

    const [data, setData] = useState(
		{
            username : "",
			email: "",
            unique_token : ""
			
		});
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ [input.name]: input.value });
	};

    var rand = function() {
        return Math.random().toString(36).substring(2); 
    };
    
    var token = function() {
        return rand() + rand();
    };
    
    

    const handleSubmit = async (e) => {
		e.preventDefault();
        setData({ [`unique_token`]: token() });
		emailjs.send('service_rmrb5ei','template_fazpk0r',data,'-eRbObFH-8u14gpGe')
        .then(response=>{
            console.log('SUCCESS!', response.status, response.text);
        },(err) => {
            console.log('FAILED...', err);
         })
	};




  return (
    <div className="mybody">
			<div className="login p-5">
				<h2>Reset Password</h2>
				<form className="needs-validation" onSubmit={handleSubmit}>
					<div className="form-group was-validated">
						<label className="form-label" htmlFor="email">User Name</label>
						<input
								type="text"
								name="username"
								onChange={handleChange}
								value={data.username}
								required
								className="form-control"
							/>
					</div>
					<div className="form-group was-validated">
						<label className="form-label" htmlFor="password">Email</label>
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
					{error && <div className="error_msg">{error}</div>}
					
					<input className="btn btn-success w-100" type="submit" />
				</form>
				
			</div>

		</div>
  )
}

export default Mailer