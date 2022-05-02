import * as actions from './cartActionTypes'

export const addToCart = item => {
    return({
        type: actions.ADD_TO_CART,
        payload: {
            item
        }
    }
    )
}

export const removeFromCart = id => {
    return({
        type: actions.REMOVE_FROM_CART,
        payload: {
            id
        }
    })
}

export const increaseQuantity = increaseItemId => {
    return({
        type: actions.INCREASE_QUANTITY,
        payload: {
            increaseItemId
        }
    })
}

export const decreaseQuantity = (decreaseItemId,quantity) => {
    return(
        {
            type: actions.DECREASE_QUANTITY,
            payload: {
                decreaseItemId,
                quantity
            }
        }
    )
}

export const orderNow = () => ({type: actions.ORDER_NOW})