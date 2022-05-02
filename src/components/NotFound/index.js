import React from 'react'
import notFound from './not-found.png'
import './index.css'

const NotFound = props => {
    const redirectToHome = () => {
        const {history} = props 
        history.replace('/')
    }

    return(
        <div className="not-found-container">
            <img src={notFound} alt="not-found" />
            <button onClick={redirectToHome} className="back-home-button">Back to Home</button>
        </div>
    )
}

export default NotFound