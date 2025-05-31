import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from "class-validator";

export class StockDTO {
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    @ApiProperty({
        name: 'id',
        type: Number,
        description: 'Product ID',
        required: true,
    })
    id: Number;

    @IsNotEmpty()
    @Min(0)
    @Max(1000)
    @IsNumber()
    @ApiProperty({
        name: 'stock',
        type: Number,
        description: 'Stock of an existing product',
        required: true,
    })
    stock: Number;
}