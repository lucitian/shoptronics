import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    createProduct, 
    deleteProduct,
    listProducts,
} from '../actions/productActions'
import './css/ProductListScreen.css'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
    PRODUCT_CREATE_RESET,
    PRODUCT_DELETE_RESET
} from '../constants/productConstants'

export default function ProductListScreen(props) {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList
    
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin
    
    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate

    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = productDelete

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            props.history.push(`/collection/${createdProduct._id}/edit`)
        }
        if(successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET })
        }
        dispatch(listProducts())
    }, [createdProduct, dispatch, props.history, successCreate, successDelete, userInfo._id])

    const deleteHandler = (product) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteProduct(product._id))
        }    
    }

    const createHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div className="productlist-container">
            <div>
                <h1>Products</h1>
                <button type="button" className="productlist-create-button" onClick={createHandler}>
                    Create Product
                </button>
                {loadingDelete && <LoadingBox></LoadingBox>}
                {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                {loadingCreate && <LoadingBox></LoadingBox>}
                {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
                { loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>CONSOLE</th>
                                <th>PRICE</th>
                                <th>DEVELOPER</th>
                                <th>PUBLISHER</th>
                                <th>STOCK</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.console}{' '}</td>
                                    <td>{product.price}</td>
                                    <td>{product.developer}</td>
                                    <td>{product.publisher}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() =>
                                            props.history.push(`/collection/${product._id}/edit`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => deleteHandler(product)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}