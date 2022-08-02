import { Entity, PrimaryGeneratedColumn, Column,Generated, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { OrderLine } from "./orderLine";
import { Product } from "./product";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mobile: string;

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

    @OneToMany(()=>OrderLine, orderline=>orderline.order)
    orderlines: OrderLine[];

    @Column({default: false})
    completed:boolean;

}