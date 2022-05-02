import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { AiOutlinePlusSquare,AiOutlineMinusSquare } from 'react-icons/ai';
import { ImCross } from 'react-icons/im'

import Navbar from '../Navbar'
import LoaderComponent from '../LoaderComponent'
import './index.css'
import 'reactjs-popup/dist/index.css'
import { removeFromCart, increaseQuantity, decreaseQuantity, orderNow } from '../../redux/cart/cartActions';

const createCartItems = (cartItem, props) => {
    const { image_url, title, price, quantity, id } = cartItem
    return(
        <li key={id} className="cart-list-item">
            <img src={image_url} alt={title} />
            <div>
                <div className="cart-title-container">
                    <h2>{title}</h2>
                    <h3>Rs {price * quantity} /-</h3>
                </div>
                <div className="cart-item-quantity-container">
                    <AiOutlineMinusSquare 
                        className="cart-quantity" 
                        onClick = {() => props.decreaseQuantity(id,quantity)}
                    />
                    <p>{quantity}</p>
                    <AiOutlinePlusSquare 
                        className="cart-quantity" 
                        onClick={() => props.increaseQuantity(id)}
                    />
                </div>
            </div>
            <button className="remove-icon-button" onClick={() => props.removeFromCart(id)}>
                <ImCross />
            </button>
        </li>
    )
}


const renderCartItems = (props, isOrdered, setIsOrdered) => {
    const { cartItems, orderNow } = props
    let totalAmount = 0 
    cartItems.map(eachItem => {
        totalAmount += eachItem.price * eachItem.quantity
        return eachItem
    })

    const orderItems = () => {
        setIsOrdered(true)
        setTimeout(function(){
            setIsOrdered(false)
            orderNow()
        }, 700)
    }

    return(
        <div>
            <h1>My Cart</h1>
            <ul className="cart-list-item-container">
                {cartItems.map(eachItem => createCartItems(eachItem, props))}
            </ul>
            <h2 className="total-amount">Total: <span>Rs {totalAmount}/-</span></h2>
            <button className="order-now-button" onClick={orderItems}>Order Now </button>
            {isOrdered && <p className="order-successfully">Ordered Successfully</p>}
        </div>
    )
}


const renderNoCartItemsPresent = history => {
    return(
        <div className="no-cart-items-container">
            <h1>No cartItems are added</h1>
            <button onClick={() => history.replace("/products")}>Shop Now</button>
        </div>
    )
}

const Cart = props => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isOrdered, setIsOrdered ] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        setTimeout(function(){
            setIsLoading(false)
        },1000)
    }, [])

    return(
        <>
            <Navbar />
            { isLoading ? <LoaderComponent /> :
              props.cartItems.length === 0 ? renderNoCartItemsPresent (props.history) : 
              renderCartItems(props, isOrdered, setIsOrdered)}
        </>
    )
}

const mapStateToProps = state => {
    return({
        cartItems: state.cartItems
    })
}

const mapDispatchToProps = dispatch => {
    return({
        removeFromCart: id => dispatch(removeFromCart(id)),
        increaseQuantity: id => dispatch(increaseQuantity(id)),
        decreaseQuantity: (id,quantity) => dispatch(decreaseQuantity(id,quantity)),
        orderNow : () => dispatch(orderNow())
    }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)