import React, { useState } from 'react'
import { Link , withRouter, useLocation} from 'react-router-dom'
import { connect } from 'react-redux'

import { BsCart, BsArrowBarRight, BsArrowBarDown } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'

import './index.css'

const Navbar = props => {
    const location = useLocation()
    const path = location.pathname


    const {history, cartItems} = props
    let totalCartItems = 0
    cartItems.map(eachItem => {
        totalCartItems += eachItem.quantity
        return eachItem
    })

    const logoutFromSite = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("userName")
        history.replace("/login")
    }

    const [ isBarIconClicked, setIsBarIconClicked] = useState(false)

    const changeBarIcon = () => {
        setIsBarIconClicked(prevState => !prevState)
    }

    return(
        <nav className="navbar">
            <div className="navbar-large">
                <Link to="/" className="route-links">
                    <h3 className="active-section">
                        <FaHome className="home-icon" />
                    </h3>
                </Link>
                <div className="navbar-second-section">
                <Link to="/" className="route-links">
                        <h3 className={path === "/" ? "active-section" : ""}>Home</h3>
                    </Link>
                    <Link to="/products" className="route-links">
                        <h3 
                            className={path === "/products" || path.includes("/products") ? "active-section" : ""}
                        >
                            Products
                        </h3>
                    </Link>
                    <Link to="/cart" className="route-links">
                        <h3 className={path === "/cart" ? "active-section cart-icon-container" : "cart-icon-container"}>
                            <BsCart className="cart-icon" /> 
                            <p className="total-cart-items">{totalCartItems}</p>
                        </h3>
                    </Link>
                    <Link to="/orders" className="route-links">
                        <h3 className={path === "/orders" ? "active-section" : ""}>
                            Orders
                        </h3>
                    </Link>
                    <button onClick={logoutFromSite} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
            <div className="navbar-small">
                <Link to="/" className="route-links">
                    <h3 className="active-section">
                        <FaHome className="home-small-icon" />
                    </h3>
                </Link>
                {!isBarIconClicked &&<BsArrowBarRight className="home-small-icon" onClick={changeBarIcon} />}
                {isBarIconClicked && <BsArrowBarDown className="home-small-icon" onClick={changeBarIcon} />}
            </div>
            {isBarIconClicked && <div className="small-screen-container">
                <Link to="/products" className="route-links">
                    <h3 
                        className={path === "/products" || path.includes("/products") ? "active-section" : ""}
                    >
                        Products
                    </h3>
                </Link>
                <Link to="/cart" className="route-links">
                    <h3 className={path === "/cart" ? "active-section cart-icon-container" : "cart-icon-container"}>
                        <BsCart className="cart-icon" /> 
                        <p className="total-cart-items">{totalCartItems}</p>
                    </h3>
                </Link>
                <Link to="/orders" className="route-links">
                    <h3 className={path === "/orders" ? "active-section" : ""}>
                        Orders
                    </h3>
                </Link>
                <button onClick={logoutFromSite} className="logout-button">
                    Logout
                </button>
            </div>}
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    }
}

export default connect(mapStateToProps)(withRouter(Navbar))