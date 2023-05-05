import React from "react";





const Login = () => {
    return (
        <div>
            <div className="login__bg" >
                <form className="login__form">
                    <h1 className="login__header">Login</h1>
                    <div className="login__username flex-column">
                        <label htmlFor="username" className="login__label">Username</label>
                        <input type="text" placeholder="Username" className="login__input" />
                    </div>
                    <div className="login__password flex-column">
                        <label className="login__label">Password</label>
                        <input type="password" placeholder="Password" className="login__input" />
                    </div>
                    <div className="login__options">
                        <input type="checkbox" className="login__checkbox" />
                        <div className="login__remember">Remember me</div>
                        <div className="login__forgot">Forgot Password</div>
                    </div>
                    <button className="login__btn">Login</button>
                    <p className="login__register">Don't have an account? <span>Register Here</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login