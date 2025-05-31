import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ProductDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'id',
        type: Number,
        description: 'Product ID',
        required: false,
    })
    id?: Number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        name: 'name',
        type: String,
        description: 'Product name',
        required: true,
    })
    name!: String;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'price',
        type: Number,
        description: 'Product price',
        required: true,
    })
    price!: Number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        name: 'stock',
        type: Number,
        description: 'Available stock',
        required: true,
    })
    stock!: Number;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        name: 'deleted',
        type: Boolean,
        description: 'Soft deleted flag',
        required: false,
    })
    deleted?: Boolean;
}