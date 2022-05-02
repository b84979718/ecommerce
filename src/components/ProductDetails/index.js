import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'


import { productData } from '../data'
import Navbar from '../Navbar'
import LoaderComponent from '../LoaderComponent'
import { AiFillStar, AiOutlinePlusSquare,AiOutlineMinusSquare } from 'react-icons/ai';
import { FaShare } from 'react-icons/fa'

import './index.css'
import { addToCart } from '../../redux/cart/cartActions';

const ProductDetails = props => {
    const { id } = useParams()
    const [ quantity,setQuantity ] = useState(1)

    const [ isAdded, setIsAdded ] = useState(false)

    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(function(){
            setIsLoading(false)
        },1000)
    }, [])

    const specifiedProduct = productData.filter(eachProduct => eachProduct.id === parseInt(id))
    const { image_url, title, price, brand, rating } = specifiedProduct[0]

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1)
    }

    const item = {...specifiedProduct[0], quantity }

    const url = window.location.href
    return(
        <> 
            <Navbar />
            { isLoading ? <LoaderComponent /> :  (
            <div className="product-details-page-container">
                <div className="product-details-container">
                    <img src={image_url} alt={title} />
                    <div>
                        <h2 className="product-title">{title}</h2>
                        <h3 className="product-price">Rs {price}/-</h3>
                        <p className="product-rating">
                            {rating} <AiFillStar />
                        </p>
                        <p className="brand-para">Brand : <span className="product-brand">{brand}</span></p>
                        <div className="product-count">
                            <AiOutlineMinusSquare 
                                className="quantity-icons"
                                onClick={decreaseQuantity} 
                            />
                            <p>{quantity} </p>
                            <AiOutlinePlusSquare 
                                className="quantity-icons"
                                onClick={increaseQuantity} 
                            />
                        </div>
                        <button 
                            type="button" 
                            className="add-to-cart-button"
                            onClick={() => {
                                props.addToCart(item)
                                setIsAdded(true)
                                setTimeout(function(){
                                    setIsAdded(false)
                                }, 2000)
                            }}
                        >
                            Add to Cart
                        </button>
                        { isAdded && <p className="added-to-cart-text">Added to cart </p>}
                        <CopyToClipboard text={url}>
                            <button className="share-button">
                                Share <FaShare />
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
            )
        }
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart : item => dispatch(addToCart(item))
    }
}

export default connect(null, mapDispatchToProps)(ProductDetails)