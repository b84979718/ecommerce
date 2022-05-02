import React from 'react'
import { ThreeDots } from "react-loader-spinner";
import './index.css'

const LoaderComponent = () => {
    return (
        <div className="loader-container">
            <ThreeDots
                color="blue"
                height={80}
                width={80}
            /> 
        </div>
    )
}

export default LoaderComponent