import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Product from '../models/productModel.js'
import { isAdmin, isAuth } from '../utils.js'

const productRouter = express.Router()

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find()
        res.send(products);
    })
);

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        //await Product.remove({});
        const createdProducts = await Product.insertMany(data.games)
        res.send({ createdProducts })
    })
);

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        if (product) {
            res.send(product)
        } else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    })
);

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'sample name ' + Date.now(),
            console: 'PlayStation 4',
            image: '/images/Games/inFAMOUS.jpg',
            price: 0,
            developer: 'Sucker Punch Productions LLC',
            publisher: 'Sony Computer Entertainment America LLC',
            stock: '0'
        })
        const createdProduct = await product.save()
        res.send({ message: 'Product Created', product: createdProduct })
    })
)

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if (product) {
            product.name = req.body.name
            product.console = req.body.console
            product.image = req.body.image
            product.price = req.body.price
            product.developer = req.body.developer
            product.publisher = req.body.publisher
            product.stock = req.body.stock
            const updatedProduct = await product.save()
            res.send({ message: 'Product Updated!', product: updatedProduct})
        } else {
            res.status(404).send({ message: 'Product does not exist!' })
        }
    })
)

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id)
        if(product) {
            const deleteProduct = await product.remove()
            res.send({ message: 'Product deleted!', product: deleteProduct })
        } else {
            res.status(404).send({ message: 'Product Not Found '})
        }
    })
)

export default productRouter