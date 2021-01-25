import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/LoadingBox'
import './css/PlaceOrderScreen.css'

export default function PlaceOrderScreen(props) {
    const cart = useSelector((state) => state.cart)
    if(!cart.paymentMethod) {
        props.history.push('/payment')
    }

    const orderCreate = useSelector((state) => state.orderCreate)
    const { loading, success, error, order } = orderCreate

    const toPrice = (num) => Number(num.toFixed(2))
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    )
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice
    const dispatch = useDispatch()
    const placeOrderHandler = () => {
        // TODO: dispatch place order action
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
    }

    useEffect(() => {
        if(success) {
            props.history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [ dispatch, order, props.history, success ])

    return (
        <div className="placeorder-container">
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div>
                <div className="placeorder-shipping">
                    <div className="placeorder-shipping-text">
                        <h2>Shipping</h2>
                    </div>
                    <p>
                        <strong>Name:</strong> {cart.shippingAddress.fullName}<br />
                        <strong>Address:{' '}</strong> 
                            {cart.shippingAddress.address}, {''}
                            {cart.shippingAddress.city}, {''}
                            {cart.shippingAddress.postalCode}, {''}
                            {cart.shippingAddress.country}
                    </p>
                </div>
                <div className="division"></div>
                <div className="placeorder-method-text">
                    <h2>Payment</h2>
                    <p>
                        <strong>Method:</strong> {cart.paymentMethod}
                    </p>
                </div>
                <div className="division"></div>
                <div className="placeorder-order-text">
                    <h2>Order Items</h2>
                    <div>
                        {
                            cart.cartItems.map((item) => (
                                <div key={item.product} className="placeorder-items">
                                    <div>
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="small"></img>
                                        </div>
                                        <div className="placeorder-item-title">
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div>
                                            {item.qty} x P{item.price} = P {item.qty * item.price}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="division"></div>

                <div>
                    <div className="placeorder-summary">
                        <div className="placeorder-summary-title">
                            <h2>Order Summary</h2>
                        </div>
                        <div className="placeorder-summary-items">
                            <div>Items</div>
                            <div>P {cart.itemsPrice.toFixed(2)}</div>
                        </div>
                        <div className="placeorder-summary-items">
                            <div>Shipping</div>
                            <div>P {cart.shippingPrice.toFixed(2)}</div>
                        </div>
                        <div className="placeorder-summary-items">
                            <div>Tax</div>
                            <div>P {cart.taxPrice.toFixed(2)}</div>
                        </div>
                        <div>
                            <div>
                                <strong>Order Total</strong>
                            </div>
                            <div>
                                <strong>P {cart.totalPrice.toFixed(2)}</strong>
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={placeOrderHandler}
                                className="placeorder-button"
                                disabled={cart.cartItems.length === 0}
                            >
                                Place Order
                            </button>
                        </div>
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </div>
                </div>
            </div>
        </div>
    )
}