import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateLocationDto {

    @IsString()
    @IsNotEmpty()
    locationName: string;

    @IsNumber()
    @IsOptional()
    latitude: number;

    @IsNumber()
    @IsOptional()
    longitude: number;
}