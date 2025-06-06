import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ClientAddressDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'id',
        type: Number,
        description: 'Address ID',
        required: false,
    })
    id?: Number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'country',
        type: String,
        description: 'Country name',
        required: true,
    })
    country!: String;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'province',
        type: String,
        description: 'Province name',
        required: true,
    })
    province!: String;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'town',
        type: String,
        description: 'Town name',
        required: true,
    })
    town!: String;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'street',
        type: String,
        description: 'Street name',
        required: true,
    })
    street!: String;
}
