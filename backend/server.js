import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import orderRouter from './routers/orderRouter.js';
import dotenv from 'dotenv'
import path from 'path'
import uploadRouter from './routers/uploadRouter.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shoptronics', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use('/uploads', uploadRouter)
app.use('/users', userRouter)
app.use('/collection', productRouter)
app.use('/order', orderRouter);

app.get('/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb' )
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
    res.send('Server ready!')
})

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})