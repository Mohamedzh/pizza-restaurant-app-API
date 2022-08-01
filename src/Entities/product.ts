import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Category } from "./category";
import { Order } from "./order";
import { OrderLine } from "./orderLine";


@Entity()
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    popular: boolean;

    @Column()
    price: number;

    @Column()
    description: string;
    
    @Column()
    imageUrl: string;

    @ManyToOne(()=>Category, category=>category.products, {nullable: false})
    category: Category;

    @ManyToMany(()=> Order)
    @JoinTable()
    orders: Order[];

    @ManyToMany(()=>OrderLine)
    @JoinTable()
    orderlines: OrderLine[];
}
