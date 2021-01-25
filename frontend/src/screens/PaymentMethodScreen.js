import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import './css/PaymentMethodScreen.css'

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    if(!shippingAddress.address){
        props.history.push('/shipping')
    }

    const [ paymentMethod, setPaymentMethod ] = useState('PayPal')
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('placeorder')
    }
    return(
        <div className="paymentmethod-screen">
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="paymentMethod-form" onSubmit={ submitHandler }>
                <div className="paymentmethod-title">
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div className="paymentmethod-paypal">
                        <input 
                            type="radio"
                            id="paypal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>         
                        <label htmlFor="paypal">Paypal</label>    
                    </div>
                </div>
                <div>
                    <div className="paymentmethod-stripe">
                        <input 
                            type="radio"
                            id="stripe"
                            value="stripe"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <label />
                    <button className="paymentmethod-button" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}