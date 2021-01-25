import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProducts, updateProduct } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Axios from 'axios'
import './css/ProductEditScreen.css'

export default function ProductEditScreen(props) {
    const productId = props.match.params.id
    const [ name, setName ] = useState('')
    const [ console, setConsole ] = useState('')
    const [ image, setImage ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ developer, setDeveloper ] = useState('')
    const [ publisher, setPublisher ] = useState('')
    const [ stock, setStock ] = useState('')
    
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
    
    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = productUpdate

    const [ loadingUpload, setLoadingUpload ] = useState(false)
    const [ errorUpload, setErrorUpload ] = useState('')

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin

    const dispatch = useDispatch()

    useEffect(() => {
        if(successUpdate) {
            props.history.push('/productlist')
        }
        if(!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailsProducts(productId))
        } else {
            setName(product.name)
            setConsole(product.console)
            setImage(product.image)
            setPrice(product.price)
            setDeveloper(product.developer)
            setPublisher(product.publisher)
            setStock(product.stock)
        }
    }, [product, dispatch, productId, successUpdate, props.history])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const bodyFormData = new FormData()
        bodyFormData.append('image', file)
        setLoadingUpload(true)
        try {
            const { data } = await Axios.post('/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setImage(data)
            setLoadingUpload(false)
        } catch (error) {
            setErrorUpload(error.message)
            setLoadingUpload(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
                _id: productId,
                name,
                console,
                image,
                price,
                developer,
                publisher,
                stock
            })
        )
    }

    return (
        <div className="productedit-container">
            <form className="productedit-form" onSubmit={submitHandler}>
                <div className="productedit-title">
                    <h1>Editing Product <span>{productId}</span></h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="console">Console</label>
                            <input 
                                id="console"
                                type="text"
                                placeholder="Enter console"
                                value={console}
                                onChange={(e) => setConsole(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                id="image"
                                type="text"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="imageFile">Image File</label>
                            <input 
                                type="file"
                                id="imageFile"                               
                                label="Choose Image"
                                onChange={uploadFileHandler}
                            ></input>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && (
                                <MessageBox variant="danger">{errorUpload}</MessageBox>
                            )}
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input 
                                id="price"
                                type="text"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor="developer">Developer</label>
                            <input 
                                id="developer"
                                type="text"
                                placeholder="Enter developer"
                                value={developer}
                                onChange={(e) => setDeveloper(e.target.value)}
                            ></input>
                        </div>                        
                        <div>
                            <label htmlFor="publisher">Publisher</label>
                            <input 
                                id="publisher"
                                type="text"
                                placeholder="Enter publisher"
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                            ></input>
                        </div>                       
                        <div>
                            <label htmlFor="stock">Stock</label>
                            <input 
                                id="stock"
                                type="text"
                                placeholder="Enter stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label></label>
                            <button className="productedit-button" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}