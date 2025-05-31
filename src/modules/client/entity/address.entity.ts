import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id?: Number;

    @Column({
        type: String,
        nullable: false,
        length: 100
    })
    country!: String;

    @Column({
        type: String,
        nullable: false,
        length: 100
    })
    province!: String;
    
    @Column({
        type: String,
        nullable: false,
        length: 100
    })
    town!: String;
    
    @Column({
        type: String,
        nullable: false,
        length: 100
    })
    street!: String;
}