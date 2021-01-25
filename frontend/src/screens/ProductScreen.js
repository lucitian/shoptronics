
import './css/ProductScreen.css'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsProducts } from '../actions/productActions'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function ProductScreen(props) {
    const dispatch = useDispatch()
    const productId = props.match.params.id
    const [qty, setQty] = useState(0)
    const productDetails = useSelector(( state ) => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(detailsProducts(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        if( qty > 0){
            alert("Added to cart!")
            props.history.push(`/cart/${productId}?qty=${qty}`);
        } else {
            alert("Please set quantity!")
        }

    }

    const buyNowHandler = () => {
        props.history.push(`/cart/${productId}?qty=${1}`);
    }

    const decNum = () => {
        if ( qty > 0) {
            setQty( qty - 1 )
        } else {
            alert('Not available')
            setQty(0)
        }
    }

    const incNum = () => {
        if ( qty > product.stock - 1){
            alert('Stock limit reached!')
            setQty(qty)
        } else {
            setQty( qty + 1)
        }
    }

    return (
        <div className="screen-container">
            {
                loading ? (<LoadingBox></LoadingBox>):
                error ? (<MessageBox variant="danger">{ error }</MessageBox>):
                (
                    <div className="product-container">
                        <div className="product-container-field">
                            <div className="product-image">
                                <img className="large" src={product.image} alt={product.name}></img>
                            </div>
                            <div className="product-title">
                                <div className="product-name">
                                    <h5>{product.name}</h5>
                                </div>
                                <div className="product-developer">
                                    <h5>{product.developer}</h5>
                                </div>
                                <div className="division"></div>
                                <div className="product-price">
                                    <h5>P {product.price}</h5>
                                </div>
                                <div className="product-stock">
                                    {product.stock > 0 ? 
                                        (<span className="success"><h7>Stock: {product.stock}</h7></span>):
                                        (<span className="error">Unavailable</span>)
                                    }
                                </div>
                                {
                                    product.stock > 0 && (
                                        <>
                                        <div className="product-quantity">
                                            <div className="product-quantity-text">
                                                <h5>Quantity</h5>
                                            </div>
                                            <div className="product-increm-decrem">
                                                <button className="decrement" onClick={decNum}><i className="fa fa-minus"></i></button>
                                                <input type="text" id="quantity" value={qty}></input>
                                                <button className="increment" onClick={incNum}><i className="fa fa-plus"></i></button>
                                            </div>                                                
                                            <div className="product-buttons">
                                                <button className="add-to-cart" onClick={ addToCartHandler }>Add to Cart</button>
                                                <button className="buy-now" onClick={ buyNowHandler }>Buy Now</button>
                                            </div>
                                        </div>
                                        </>
                                    )                                        
                                }                                    
                            </div>
                            <div className="product-delivery-box">
                                <div className="product-delivery-options">
                                    <h5 id="delivery-options">Delivery options</h5>
                                    <h5 id="delivery-type">Express Delivery - Php200.00 </h5>
                                    <h5 id="sub-delivery">Same Day</h5>  
                                    <h5 id="delivery-type">Standard Delivery - Php0.00</h5>
                                    <h5 id="sub-delivery">Est. 2-3 Days</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductScreen