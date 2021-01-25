import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import MessageBox from '../components/MessageBox';

import './css/CartScreen.css'

function CartScreen(props) {
    const dispatch = useDispatch()
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    useEffect(()=> {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id))
    };
    const checkoutHandler = (id) => {
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div className="cartscreen-container">
            <div className="cartscreen-field">
                <h1>Cart</h1>
                <div className="cart-title-field">
                    <div className="cart-field-item-text"><h3>Item</h3></div>
                    <div className="cart-field-price-text"><h3>Price</h3></div>
                    <div className="cart-field-quantity-text"><h3>Quantity</h3></div>
                    <div className="cart-field-remove-text"><h3>Remove</h3></div>
                </div>
                {
                    cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is Empty.
                            <Link to="/">Go to Shopping</Link>
                        </MessageBox>
                    ) : (
                        <div>
                            {
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <div className="cart-product-field">
                                            <div className="cart-field-item-image-name">
                                                <div><img src={item.image} alt={item.name}></img></div>
                                                <div><Link to={`/collection/${item.product}`} style={{ color: 'black'}}>{item.name}</Link></div>
                                            </div>
                                            <div className="cart-field-item-price">
                                                <h3>P {item.price}</h3>
                                            </div>
                                            <div className="cart-field-item-quantity">
                                                <select
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCart(item.product, Number(e.target.value))
                                                        )
                                                    }
                                                >
                                                    {[...Array(item.stock).keys()].map((x) => (
                                                        <option 
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="cart-field-item-remove">
                                                <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="cart-division"></div>
                                    </div>
                                ))
                            }
                            
                        </div>
                    )
                }     
                <div className="cart-final-price">
                    <h3 className="total-price">Total: ({cartItems.reduce((a, c) => a + c.qty, 0)} items) 
                    : P {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </h3>
                    <div className="cart-checkout-button">
                        <button
                            type="button"
                            onClick={checkoutHandler}
                            disabled={cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>           
            </div>
        </div>
    );
}

export default CartScreen