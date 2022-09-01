import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderLine extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column()
    // orderId:number;

    // @Column()
    // productId:number;

    @Column()
    quantity: number;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        onUpdate: "CURRENT_TIMESTAMPTZ"
    })
    updatedAt: Date;

    @ManyToOne(() => Product, product => product.orderlines)
    product: Product

    @ManyToOne(() => Order, order => order.orderlines)
    order: Order

}