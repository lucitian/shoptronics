import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './css/Signin.css'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SigninScreen(props) {
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')

    const redirect = props.location.search 
        ? props.location.search.split('=')[1] 
        : '/'

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo, loading, error } = userSignin

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={submitHandler}>
                <div className="signin-title">
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}

                <div>
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="signin-submit-button">
                        Sign in
                    </button>
                </div>
                <div className="signin-new-box">
                    <label />
                    <div className="signin-new-text">
                        New customer? {' '} 
                        <Link to={`/register?redirect=${redirect}`}>
                            Create your account
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}