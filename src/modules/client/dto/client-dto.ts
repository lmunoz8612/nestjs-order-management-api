import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Address } from "../entity/address.entity";

export class ClientDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    id?: Number;
    
    @IsNotEmpty()
    @IsString()
    name!: String;
    
    @IsNotEmpty()
    @IsEmail()
    email!: String;

    @Type(() => Address)
    @IsNotEmpty()
    address!: Address;
}