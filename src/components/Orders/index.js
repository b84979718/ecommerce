import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import LoaderComponent from '../LoaderComponent'
import Navbar from '../Navbar'

import './index.css'

const renderEachOrder = (orderDetails, index) => {
    let total_amount = 0 
    return(
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
            <ol>
                {orderDetails.map(each => {
                    total_amount += each.price * each.quantity
                    return(
                    <li key={each.id}>{each.title}</li>
                    )
                })}
            </ol>
            </td>
            <td>Rs {total_amount} /-</td>
        </tr>
    )
}

const renderNoOrders = history => {
    return(
        <div>
            <h1>You have not placed any orders till now</h1>
            <button className="shop-now-button" onClick={() => history.replace("/products")}>
                Shop Now
            </button>
        </div>
    )
}

const Orders = props => {
    const { orders } = props
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(function(){
        setIsLoading(true)
        setTimeout(function(){
            setIsLoading(false)
        },500)
    },[])

    return(
        <>
            <Navbar />
            { isLoading ? <LoaderComponent /> : 
            <div className="orders-container">
            { orders.length === 0 ? renderNoOrders(props.history) :
                <>
                <h1>Your Orders</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Order No</th>
                            <th>Ordered Items</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((eachOrder,index) => renderEachOrder(eachOrder,index) )}
                    </tbody>
                </table>
                </>
            }
            </div>
}
        </> 
    )
}

const mapStateToProps = state => {
    return({
        orders: state.orders
    })
}

export default connect(mapStateToProps)(Orders)