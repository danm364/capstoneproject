import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {Navigate, Link} from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({loggedIn, setLoggedIn, setCurrentAccount, currentAccount}) => {

    

    function checkValidUser(e) {
        e.preventDefault()
    
        let email = e.target.querySelector("#login__email").value
        let password = e.target.querySelector("#login__password").value
        let error = e.target.querySelector(".login__error-msg")
    
        if (email.length > 0 && password.length > 0) {
            axios.post(`${process.env.REACT_APP_HOST_DATA}/accounts/loginValidation`, {
                email : email,
                password : password
            }, {
                withCredentials: true
            }).then((response) => {
                console.log(response)
                if (response.data.isSuccessful) {

                    error.style.display = "none"
                    console.log(response.data.profile)
                    
                    setCurrentAccount(response.data)
                }
                else {
                    error.style.display = "block"
                }
            })
        }
    }

    let resetError = useRef(null)

    

    useEffect(() => {
        
        resetError.current.style.display = "none"

    }, [])

    return (
        <div>
            <div className="login__bg" >
                <form className="login__form" onSubmit={checkValidUser}>
                    <h1 className="login__header">Login</h1>
                    <div className="login__username flex-column">
                        <label htmlFor="username" className="login__label">Email</label>
                        <input type="text" placeholder="Username" className="login__input" id="login__email"/>
                        <div className="login__error-msg" ref={resetError}>Incorrect Email/Password</div>
                    </div>
                    <div className="login__password flex-column">
                        <label className="login__label">Password</label>
                        <input type="password" placeholder="Password" className="login__input" id="login__password"/>
                    </div>
                    <div className="login__options">
                        <input type="checkbox" className="login__checkbox" />
                        <div className="login__remember">Remember me</div>
                        <div className="login__forgot">Forgot Password</div>
                    </div>
                    <button className="login__btn">Login</button>
                    <p className="login__register">Don't have an account? <Link to="/register" className="login__register">Register Here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login