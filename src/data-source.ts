import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Product } from "./Entities/product";
import { Order } from "./Entities/order";
import { OrderLine } from "./Entities/orderLine";
import { Category } from "./Entities/category";
// import { User } from "./Entities/user";

config();
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.pghost,
  port: Number(process.env.pgport),
  username: process.env.pguser,
  password: process.env.pgpassword,
  database: process.env.database,
  synchronize: true,
  logging: false,
  entities: [Product, Order, OrderLine, Category],
  migrations: ["migration/*.ts"],
  subscribers: [],
});

// Product.useDataSource(AppDataSource);
// Order.useDataSource(AppDataSource);
// OrderLine.useDataSource(AppDataSource);
// Category.useDataSource(AppDataSource);

export default AppDataSource;
