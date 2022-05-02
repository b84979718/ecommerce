import * as actions from './cartActionTypes'

const cartItems = localStorage.getItem("cartItems") === null ? [] : 
                 JSON.parse(localStorage.getItem("cartItems"))
const orders = localStorage.getItem("orders") === null ? [] : JSON.parse(localStorage.getItem("orders"))

const inititalState = {
    cartItems,
    orders
}


const cartReducer = (state = inititalState, action) => {
    switch (action.type) {
        case actions.ADD_TO_CART:
            const cartItems = state.cartItems
            const { item } = action.payload
            let isItemThere = false
            const updatedCartItems = cartItems.map(eachCartItem => {
                if ( eachCartItem.id === item.id ) {
                    isItemThere = true
                    return (
                        {...eachCartItem, quantity: eachCartItem.quantity + item.quantity}
                    )
                }
                return eachCartItem
            })
            const finalCartItems = isItemThere ? updatedCartItems : [...updatedCartItems, item]
            localStorage.setItem("cartItems",JSON.stringify(finalCartItems))
            return({
                ...state,
                cartItems: finalCartItems
            })
        case actions.REMOVE_FROM_CART:
            const {id} = action.payload
            const removedCartItems = state.cartItems.filter(eachItem => eachItem.id !== id)
            localStorage.setItem("cartItems",JSON.stringify(removedCartItems))
            return ({
                ...state,
                cartItems: removedCartItems
            })
        case actions.INCREASE_QUANTITY:
            const {increaseItemId} = action.payload
            const increaseCartItems = state.cartItems.map(eachItem => {
                if (eachItem.id === increaseItemId){
                    return {...eachItem,quantity: eachItem.quantity + 1 }
                }
                return eachItem
            })
            localStorage.setItem("cartItems",JSON.stringify(increaseCartItems))
            return({
                ...state,
                cartItems: increaseCartItems
            })
        case actions.DECREASE_QUANTITY:
            const { decreaseItemId,quantity } = action.payload
            if (quantity > 1){
                const decreasedCartItems = state.cartItems.map(eachItem => {
                    if (eachItem.id === decreaseItemId){
                        return {...eachItem,quantity: eachItem.quantity - 1 }
                    }
                    return eachItem
                })
                localStorage.setItem("cartItems",JSON.stringify(decreasedCartItems))
                return({
                    ...state,
                    cartItems: decreasedCartItems
                })
            }
            const remainingCartItems = state.cartItems.filter(eachItem => eachItem.id !== decreaseItemId)
            localStorage.setItem("cartItems",JSON.stringify(remainingCartItems))
            return({
                ...state,
                cartItems: remainingCartItems
            })
        case actions.ORDER_NOW:
            const orders = state.orders
            const updatedOrders = [...orders,state.cartItems]
            localStorage.setItem("orders", JSON.stringify(updatedOrders))
            localStorage.setItem("cartItems",JSON.stringify([]))
            return {
                cartItems: [],
                orders: updatedOrders
            }
        default:
            return state
    }
}


export default cartReducer