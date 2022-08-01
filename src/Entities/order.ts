import { Entity, PrimaryGeneratedColumn, Column,Generated, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { OrderLine } from "./orderLine";
import { Product } from "./product";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    address: string;

    @Column()
    city:string;

    @Column()
    @Generated("uuid")
    orderNo: string;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        onUpdate: "CURRENT_TIMESTAMPTZ"
    })
    updatedAt: Date;

    @ManyToMany(()=>Product)
    @JoinTable()
    products: Product[];

    @ManyToMany(()=>OrderLine)
    orderlines: OrderLine[];
    // @Column()
    // completed:boolean;

}