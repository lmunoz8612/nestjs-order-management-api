import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id?: Number;

    @Column({
        type: String,
        nullable: false,
        length: 30,
    })
    name!: String;
    
    @Column({
        type: Number,
        nullable: false,
        default: 0,
    })
    price!: Number;
    
    @Column({
        type: Number,
        nullable: false,
        default: 0,
    })
    stock!: Number;
    
    @Column({
        type: Boolean,
        nullable: false,
        default: false,
    })
    deleted?: Boolean;
}