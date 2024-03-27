import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddLocationDto {

    @IsInt()
    @IsNotEmpty()
    locationId: number;

    @IsString()
    @IsNotEmpty()
    locationName: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;
}