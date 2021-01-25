import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

import './css/Category.css'
import Product from './Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function Category() {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList


    useEffect(() => {
        dispatch(listProducts({}))
    }, [dispatch])

    return (
        <section className="category-container">
            <div className="category-container-table">
                <div className="category-container-title">
                    <h2>PlayStation Games</h2> 
                </div>
                {
                    loading ? (<LoadingBox></LoadingBox>):
                    error ? (<MessageBox variant="danger">{ error }</MessageBox>):
                    (
                        <div className="product-category-table">
                            {
                                products.map((product) => (
                                    <Product key={product._id} product={product}></Product>         

                                ))
                            }
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default Category