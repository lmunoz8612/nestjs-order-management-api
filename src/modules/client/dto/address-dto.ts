import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ClientAddressDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    id?: Number;

    @IsString()
    @IsNotEmpty()
    country!: String;
    
    @IsString()
    @IsNotEmpty()
    province!: String;
    
    @IsString()
    @IsNotEmpty()
    town!: String;

    @IsString()
    @IsNotEmpty()
    street!: String;
}
