import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, deliverOrder, payOrder } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { 
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET
} from '../constants/orderConstants';
import './css/OrderScreen.css'

export default function OrderScreen(props) {
    const orderId = props.match.params.id

    const [ sdkReady, setSdkReady ] = useState(false)

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin
    
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay
    } = orderPay

    const orderDeliver = useSelector((state) => state.orderPay)
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver
    } = orderDeliver

    const dispatch = useDispatch()
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =`https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true
            script.onLoad = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET})
            dispatch(detailsOrder(orderId))
        } else {
            if(!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript()
                } else {
                    setSdkReady(true)
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id))
    }
    
    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="orderscreen-container">
            <div className="orderscreen-field">
                <h1>Order <span>{order._id}</span></h1>
                <div className="orderscreen-grid">
                    <div className="order-field">
                        <div className="orderscreen-shipping">
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {order.shippingAddress.address},
                                {' '}{order.shippingAddress.city},
                                {' '}{order.shippingAddress.postalCode},
                                {' '}{order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at { order.deliveredAt }
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not delivered</MessageBox>
                            )}
                        </div>
                        <div className="orderscreen-payment">
                            <h2>Payment</h2>
                            <p>
                                <strong>Method:</strong> {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {order.paidAt}
                                </MessageBox>
                            ) : (
                                <MessageBox variant="danger">Not Paid</MessageBox>
                            )}
                        </div>
                        <div className="orderscreen-items">
                            <h2>Order Items</h2>
                            <div>
                                {
                                    order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <div className="orderscreen-order-items">
                                                <div className="order-image">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="order-link">
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <div className="order-price">
                                                    {item.qty} x P{item.price} = P{item.qty * item.price}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="orderscreen-summary">
                        <h2>Order Summary</h2>
                        <div className="order-items-text">
                            <div>Items</div>
                            <div>P {order.itemsPrice.toFixed(2)}</div>
                        </div>
                        <div className="order-shipping-text">
                            <div>Shipping</div>
                            <div>P {order.shippingPrice.toFixed(2)}</div>
                        </div>
                        <div className="order-tax-text">
                            <div>Tax</div>
                            <div>P {order.taxPrice.toFixed(2)}</div>
                        </div>
                        <div>
                            <div>
                                <strong>Order Total</strong>
                            </div>
                            <div>
                                <strong>P {order.totalPrice.toFixed(2)}</strong>
                            </div>
                        </div>

                        {!order.isPaid && (
                            <div className="orderscreen-paypal-button">
                                {!sdkReady ? (
                                    <LoadingBox></LoadingBox>
                                ) : (
                                    <>
                                        {errorPay && (
                                            <MessageBox variant="danger">{errorPay}</MessageBox>
                                        )}
                                        {loadingPay && <LoadingBox></LoadingBox>}
                                        
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        ></PayPalButton>
                                    </>
                                )}
                            </div>
                        )}
                        {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <div>
                                {loadingDeliver && <LoadingBox></LoadingBox>}
                                {errorDeliver && (
                                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                )}
                                <button
                                    type="button"
                                    className="orderscreen-deliver-button"
                                    onClick={deliverHandler}
                                >
                                    Deliver Order
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}