import React, { useEffect, useState } from "react";
import axios from 'axios';
import dateFormatter from "dateformat";
import {Navigate, Link, useNavigate} from 'react-router-dom';



const RegisterAccount = () => {

    let navigate = useNavigate();

    function createUser(e) {
        e.preventDefault()

        let firstName = e.target.querySelector("#register__first-name").value
        let lastName = e.target.querySelector("#register__last-name").value
        let email =  e.target.querySelector("#register__email").value
        let password = e.target.querySelector("#register__password").value
        let confirmPassword = e.target.querySelector("#register__confirm-password").value
        console.log("hello world")

        if (email.length > 0 && password.length > 0 && password.length > 0 && confirmPassword.length > 0 && firstName.length > 0 && lastName.length > 0 && password === confirmPassword) {

            let date = dateFormatter( new Date(), "yyyy-mm-dd HH:MM:ss" );

            axios.post(`${process.env.REACT_APP_HOST_DATA}/accounts/register`, {
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : password,
                date : date
            }).then((response) => {
                    if (response.data.length > 0) {
                        navigate('/login', {replace: true})
                    }
                    else {
                        console.log(console.error())
                    }
                })
                
            }
        }
    
    

    return(

        <div>
            <div className="register__bg" >
                
                <form className="register__form" onSubmit={createUser}>
                    <h1 className="register__header">Fill out the below</h1>
                    <div className="register__first-name flex-column">
                        <label className="register__label">First Name:</label>
                        <input type="text" placeholder="First Name" className="register__input" id="register__first-name" />
                    </div>
                    <div className="register__last-name flex-column">
                        <label className="register__label">Last Name:</label>
                        <input type="text" placeholder="Last Name" className="register__input" id="register__last-name"/>
                    </div>
                    <div className="register__email flex-column">
                        <label className="register__label">E-mail</label>
                        <input type="email" placeholder="E-mail" className="register__input" id="register__email"/>
                    </div>
                    <div className="register__password flex-column">
                        <label className="register__label">Password</label>
                        <input type="password" placeholder="Password" className="register__input" id="register__password"/>
                    </div>
                    <div className="register__confirm-password flex-column">
                        <label className="register__label">Confirm Password</label>
                        <input type="password" placeholder="Password" className="register__input" id="register__confirm-password"/>
                    </div>
                    <button className="register__submit-btn" >Submit</button>
                    
                </form>
            </div>
        </div>
    );

    
}

export default RegisterAccount