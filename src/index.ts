import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import "reflect-metadata";
import AppDataSource from './data-source';
import productRouter from './routes/products'
import orderRouter from './routes/orders'
import categoriesRouter from './routes/categories'

const app = express();

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/product', productRouter)
// app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/category', (categoriesRouter))

app.get('/', (req, res) => res.send('api for pizza restaurant app'))

app.listen(process.env.PORT || 5000, async () => {
    console.log(`listening on port ${process.env.port}`)
    try {
        await AppDataSource.initialize(),
            console.log('DB connection established')
    } catch (error) {
        throw new Error(`error occured ${error as Error}`)
    }
}
)
