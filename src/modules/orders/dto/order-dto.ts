import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ClientDTO } from "src/modules/client/dto/client-dto";
import { ProductDTO } from "src/modules/product/dto/product-dto";

export class OrderDTO {
    @IsOptional()
    @IsUUID()
    id?: String;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    confirm?: Date;

    @IsNotEmpty()
    @Type(() => ClientDTO)
    client!: ClientDTO;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => ProductDTO)
    products!: ProductDTO[]
}