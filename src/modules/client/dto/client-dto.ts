import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Address } from "../entity/address.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ClientAddressDTO } from "./address-dto";

export class ClientDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'id',
        type: Number,
        description: 'Cliend ID',
        required: false,
    })
    id?: Number;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        name: 'name',
        type: String,
        description: 'Client name',
        required: true,
    })
    name!: String;
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        name: 'email',
        type: String,
        description: 'Client email',
        required: true,
    })
    email!: String;

    @IsNotEmpty()
    @ApiProperty({
        name: 'address',
        type: ClientAddressDTO,
        description: 'Client address',
        required: true,
    })
    @Type(() => ClientAddressDTO)
    address!: ClientAddressDTO;
}