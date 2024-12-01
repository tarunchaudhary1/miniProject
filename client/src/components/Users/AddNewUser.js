import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalTitle, Alert } from 'react-bootstrap'
import axios from 'axios'
import SideBar from '../SideBarNav/SideBar'
import '../Questions/InnerLayout.css'
import { useTheme } from "../../Context";

const User = () => {
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)

    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => {
        SetPostShow(false);
        setfirstName("")
        setlastName("")
        setemail("")
        setpassword("")
    }

    //Define here local state that store the form Data
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [alert, setAlert] = useState(<></>);

    //Id for update record and Delete
    const [id, setId] = useState("");

    const theme = Boolean(useTheme());
    const themeClassName = theme ? "addQuestionContainer_dark" : "addQuestionContainer";

    const backCol = theme ? "#444444" : "	#ffffff";
    const textCol = theme ? "white" : "black";
    document.body.style = "background: " + backCol + ";" + "color: " + textCol;

    const GetUserData = () => {
        //here we will get all employee data
        const url = 'http://localhost:8080/api/users'
        axios.get(url)
            .then(response => {
                const result = response.data;
                //console.log(result);
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    setData(data)
                    //console.log(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/users";
            const Credentials = { firstName, lastName, email, password }
            const { data: res } = await axios.post(url, Credentials);

            if (res.status === 'SUCCESS') {
                setError(null)
                setAlert(<Alert variant="success">
                    <Alert.Heading>User addition successful</Alert.Heading>
                    <p>You can now view the user in the User List section</p>
                    <hr />
                </Alert>)
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            }
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



    useEffect(() => {
        GetUserData();

    }, [])
    return (
        <>
       
         
            <SideBar />
            <h1 className><b>Add Users</b></h1>
            <div className='format' >
               
                <div className='form-group' autoComplete='off' autoSave='off'>
                    <input type="text" className='form-control' onChange={(e) => setfirstName(e.target.value)} placeholder="Please enter First Name" />
                </div>
                <div className='form-group mt-3'>
                    <input type="text" className='form-control' onChange={(e) => setlastName(e.target.value)} placeholder="Please enter Last Name" />
                </div>
                <div className='form-group mt-3'>
                    <input type="email" className='form-control' autoComplete='off' autoSave='off' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" />
                </div>
                <div className='form-group mt-3'>
                    <input type="password" className='form-control' autoComplete='off' autoSave='off' onChange={(e) => setpassword(e.target.value)} placeholder="Please enter password" />
                </div>

                {error && <div className="error_msgs">{error}</div>} <br />
                {alert}
                <button type='submit' className={theme ? "button_dark_success" : "button_light_success"} onClick={handleSubmit}>Add User</button>

            </div>
        </>
    );
};

export default User;


