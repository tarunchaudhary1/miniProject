import React from 'react'
import "../Questions/InnerLayout.css"
import "./Style.css"
import { Link } from 'react-router-dom'
import LoginUser from './LoginUser'
import LoginAdmin from './LoginAdmin'

const UserSelection = () => {
    return (
        <div>
            <div className='login-container'>
            <div className='display-row'>
                <div className='mx-auto'>
                    <LoginUser />
                </div>

                <div className='mx-auto'>
                    <LoginAdmin />
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserSelection