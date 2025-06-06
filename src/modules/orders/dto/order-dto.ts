import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ClientDTO } from "src/modules/client/dto/client-dto";
import { ProductDTO } from "src/modules/product/dto/product-dto";

export class OrderDTO {
    @IsOptional()
    @IsUUID()
    @ApiProperty({
        name: 'id',
        type: String,
        description: 'Order UUID',
        required: false,
    })
    id?: String;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        name: 'createdAt',
        type: Date,
        description: 'Order creation date',
        required: true,
    })
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        name: 'updatedAt',
        type: Date,
        description: 'Order updated date',
        required: true,
    })
    updatedAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({
        name: 'confirmAt',
        type: Date,
        description: 'Order confirmation date',
        required: true,
    })
    confirmAt?: Date;

    @IsNotEmpty()
    @Type(() => ClientDTO)
    @ApiProperty({
        name: 'client',
        type: ClientDTO,
        description: 'Order Client',
        required: true,
    })
    client!: ClientDTO;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => ProductDTO)
    @ApiProperty({
        name: 'products',
        type: ProductDTO,
        isArray: true,
        description: 'Order Products',
        required: true,
    })
    products!: ProductDTO[]
}