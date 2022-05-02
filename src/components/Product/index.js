import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import Navbar from '../Navbar'
import { productData } from '../data'

import LoaderComponent from '../LoaderComponent'

import './index.css'

const productCard = product => {
    const { image_url,title,price,id, rating } = product 
    console.log(image_url)
    return(
        <Link to={`/products/${id}`} key={id} className="active-link">
            <li className="product-item">
                <img src={image_url} alt={title} />
                <h3>{title}</h3>
                <h4>Rs {price}/-</h4>
                <p className="rating-paragraph">
                    {rating} <AiFillStar />
                </p>
            </li>
        </Link>
    )
}

const noSearchProducts = () => {
    return(<div className="loader-container">
        <h2 className="no-products-found-heading">OOPS! No products found</h2>
    </div>)
}

const renderProducts = sortedProducts => {
    return (
        <div>
            <ul className="products-list">
                {sortedProducts.map(eachProduct => productCard(eachProduct))}
            </ul>
        </div>
    )
}


const Product = () => {
    const [sortOption, setSortOption] = useState("High")
    const [ filterRating, setFilterRating ] = useState("1")
    const [isLoading, setIsLoading] = useState(false)
    const [ searchText,setSearchText ] = useState("")
    const [ productsList, setProductsList] = useState([...productData])

    const changeSearchText = e => {
        if (e.key === 'Enter'){
            const filteredProductsList = productData.filter(each => {
                const {title} = each
                const text = title.toLowerCase()
                return text.includes(searchText.toLowerCase())
            })
            //setProductsList(filteredProductsList)
            setIsLoading(true)
            setTimeout(function(){
                setProductsList(filteredProductsList)
                setIsLoading(false)
            }, 1000)
        }
    }

    const changeRating = e => {
        setIsLoading(true)
        setTimeout(function(){
            setFilterRating(e.target.value)
            setIsLoading(false)
        }, 500)
    }

    const changeSortOption = e => {
        setIsLoading(true)
        setTimeout(function(){
            setIsLoading(false)
            setSortOption(e.target.value)
        },1000)
    }

    useEffect(() => {
        setIsLoading(true)
        setTimeout(function(){
            setIsLoading(false)
        },1000)
    },[])

    const filteredRatingProducts = productsList.filter(eachItem => eachItem.rating >= parseInt(filterRating))
    const sortedProducts = sortOption === "High" ? filteredRatingProducts :  filteredRatingProducts.map(filteredRatingProducts.pop,[...filteredRatingProducts])
    return(
        <div>
            <Navbar />
            <div className="search-container">
                <input 
                    type="search" 
                    placeholder="Search a product(Enter)" 
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onKeyDown = {changeSearchText}
                />
            </div>
            <div className="sort-option-container">
                <div>
                    <h3>Filter by</h3>
                    <select onChange={changeRating}>
                        <option value="1"> rating &gt;=1</option>
                        <option value="2"> rating &gt;=2</option>
                        <option value="3"> rating &gt;=3</option>
                        <option value="4"> rating &gt;=4</option>
                    </select>
                </div>
                <div>
                    <h3>Sort By</h3>
                    <select onChange={changeSortOption}>
                        <option value="High">Price (High-Low)</option>
                        <option value="Low">Price (Low-High)</option>
                    </select>
                </div>
            </div>
            {isLoading ? <LoaderComponent /> :
            <>
                {sortedProducts.length === 0 ? noSearchProducts() : renderProducts(sortedProducts)}
            </>
        }
        </div>
    )
}

export default Product