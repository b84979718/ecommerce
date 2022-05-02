import React, { useState } from 'react'
import { Navigate } from 'react-router'

import './index.css'

const LoginForm = (props) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isEmailExist,setIsEmailExist ] = useState(true)
    const [ isPasswordCorrect, setIsPasswordCorrect ] = useState(true)

    const {history} = props 
    const redirectToRegistrationPage = () => {
        history.replace("/registration")
    }

    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
    if (isLoggedIn === true){
        return <Navigate to="/" />
    }

    const signIn = e => {
        e.preventDefault()
        if (email.trim() === "" || password.trim() === ""){
            alert("Please enter all the fields")
            return
        }
        const usersList = JSON.parse(localStorage.getItem("usersList"))
        if (usersList === null){
            return setIsEmailExist(false)
        }
        const mail = usersList.find(each => each.email === email)
        if (mail === undefined){
            setIsEmailExist(false)
            setIsPasswordCorrect(true)
            return
        }
        if (mail.password !== password) {
            setIsEmailExist(true)
            setIsPasswordCorrect(false)
            return
        }
        localStorage.setItem("isLoggedIn",JSON.stringify(true))
        localStorage.setItem("userName", JSON.stringify(mail.name))
        history.replace("/")
    }


    return(
        <div className="sign-in-form-container">
            <div className="container">
                <h1>Sign In Form</h1>
                <form className="sign-in-form" onSubmit={signIn}>
                    <input 
                        type="email" 
                        placeholder="Enter your Email" 
                        className="sign-in-input"
                        value={email}
                        onChange = {e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Enter your Password" 
                        className="sign-in-input"
                        value={password}
                        onChange = {e => setPassword(e.target.value)}
                    />
                    { !isEmailExist && <p className="login-error">* Email Doesn't Exist</p>}
                    { !isPasswordCorrect && <p className="login-error">* Password is incorrect</p>}
                    <button 
                        className="sign-in-button" 
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
                <p>
                    Not a member? 
                    <span onClick={redirectToRegistrationPage} className="not-a-member">
                        Sign up Now
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginForm