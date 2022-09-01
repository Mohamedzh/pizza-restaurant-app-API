import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { Product } from "./product";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @UpdateDateColumn(
        {
            type: "timestamptz",
            onUpdate: "CURRENT_TIMESTAMPTZ"
        }
    )
    updatedAt: Date;

    @OneToMany(() => Product, product => product.category)
    products: Product[]

}