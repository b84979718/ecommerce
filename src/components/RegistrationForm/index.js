import React, { useState } from 'react'
import { Navigate } from 'react-router'
import './index.css'

const RegistrationForm = (props) => {
    const [ name,setName ] = useState("")
    const [ email,setEmail ] = useState("")
    const [ password,setPassword] = useState("")
    const [ confirmPass, setConfirmPass ] = useState("")
    const [ isPasswordEqual, setIsPassword ] = useState(false)
    const [ isEmailExist, setIsEmailExist ] = useState(false)
    const { history } = props 

    const redirectTologinPage = () => {
        history.replace('/login')
    }

    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))
    if (isLoggedIn === true){
        return <Navigate to="/" />
    }

    const registerUser = () => {
        const usersList = JSON.parse(localStorage.getItem("usersList"))
        const newUser = {
            name,
            email,
            password
        }
        const newUsersList = [...usersList, newUser]
        localStorage.setItem("usersList",JSON.stringify(newUsersList))
        history.replace("/login")
    }
    
    const submitForm = (e) => {
        e.preventDefault()
        if (name.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPass.trim() === ""){
            alert("Please fill all the forms")
            return
        }
        if (password !== confirmPass){
            setIsEmailExist(false)
            setIsPassword(true)
            return
        }
        const usersList = JSON.parse(localStorage.getItem("usersList"))
        if (usersList === null){
            const newUser = {
                name,
                email,
                password
            }
            localStorage.setItem("usersList",JSON.stringify([newUser]))
            history.replace("/login")
        }
        else{
            const user = usersList.find(each => each.email === email)
            if (user === undefined){
                registerUser()
            }
            else {
                setIsPassword(false)
                setIsEmailExist(true)
            }
        }
    }

    return(
        <div className="registration-form-container">
            <h1>Sign Up Form</h1>
            <form onSubmit={submitForm} className="registration-form">
                <input 
                    type="text" 
                    placeholder="Enter your FullName" 
                    value={name}
                    onChange={e => setName(e.target.value)}  
                    className="registration-input"
                />
                <input 
                    type="email" 
                    placeholder="Enter your Email"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="registration-input"
                />
                <input 
                    type="password" 
                    placeholder="Enter the password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="registration-input"
                />
                <input 
                    type="password" 
                    placeholder="Confirm password" 
                    value={confirmPass} 
                    onChange={e => setConfirmPass(e.target.value)} 
                    className="registration-input"
                />
                { isEmailExist && <p className="exist">*Email Already Exists</p>}
                { isPasswordEqual && <p className="exist"> * Password did not match</p>}
                <button type="submit" className="registration-button">Sign Up</button>
            </form>
            <p>Already have an account ? <span onClick={redirectTologinPage} className="sign-in-text">Sign In</span></p>
        </div>
    )
}

export default  RegistrationForm