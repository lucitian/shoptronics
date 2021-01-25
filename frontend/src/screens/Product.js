import React from 'react'
import { Link } from 'react-router-dom'

function Product(props){
    const {product} = props

    return (
        <div key={product.id} className="category-product-card">
            <Link className="category-product-image" to={`/collection/${product._id}`}>
                <img className="small" src={product.image} alt={product.link_name} />
            </Link>
            <div className="category-product-price">
                <h5>P {product.price}</h5>
            </div>
            <div className="category-product-name">
                <Link to="/"><h5>{product.name}</h5></Link>
            </div>
            <div className="category-product-add-to-cart">
                <Link to={`/collection/${product._id}`}>View item</Link>
            </div>
        </div>
    )
}

export default Product