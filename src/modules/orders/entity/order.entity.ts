import { Client } from "src/modules/client/entity/client.entity";
import { Product } from "src/modules/product/entity/product.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: String;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updateAt?: Date;

    @Column({
        type: Date,
        nullable: true,
    })
    confirm?: Date;

    @ManyToOne(() => Client, client => client.orders)
    client!: Client;

    @ManyToMany(() => Product)
    @JoinTable({ name: 'order-products' })
    products!: Product[];
}