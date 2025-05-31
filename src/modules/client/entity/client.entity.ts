import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Order } from "src/modules/orders/entity/order.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id?: Number;

    @Column({
        type: String,
        length: 100,
        nullable: false
    })
    name!: String;

    @Column({
        type: String,
        length: 100,
        nullable: false,
        unique: true,
    })
    email!: String;

    @OneToOne(() => Address, { cascade: ["insert", "update"], eager: true, })
    @JoinColumn()
    address!: Address;

    @OneToMany(() => Order, order => order.client)
    orders!: Order[];
}