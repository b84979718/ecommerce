import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import LoaderComponent from '../LoaderComponent'
import './index.css'

const Home = props => {
    const userName = JSON.parse(localStorage.getItem("userName"))
    const [ isLoading,setIsLoading ] = useState(false)
    const redirectToProductRoute = () => {
        const {history} = props 
        history.replace("/products")
    }

    useEffect(() => {
        setIsLoading(true)
        setTimeout(function(){
            setIsLoading(false)
        },500)
    }, [])

    return(
        <>
            <Navbar />
            <div className="home-container">
                { isLoading ? <LoaderComponent />: 
                <>
                    <h1>Hii, <span className="user-name">{userName}</span></h1>
                    <p>Explore the new Fashionable Products here</p>
                    <button className="explore-button" onClick={redirectToProductRoute}>Explore</button>
                </>
                }
            </div>
        </>
    )
}

export default Home