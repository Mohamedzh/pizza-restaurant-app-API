import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import "reflect-metadata";
import AppDataSource from './src/data-source';
import productRouter from './src/routes/products'
import orderRouter from './src/routes/orders'
import categoriesRouter from './src/routes/categories'
// import test from './api/test'

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
// app.use('/api/test', test)


app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.listen(process.env.port || 5000
    //     async () => {
    //     console.log(`listening on port ${process.env.port}`)
    //     try {
    //         await AppDataSource.initialize(),
    //             console.log('DB connection established')
    //     } catch (error) {
    //         throw new Error(`error occured ${error as Error}`)
    //     }
    // }
)

module.exports = app;