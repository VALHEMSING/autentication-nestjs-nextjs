import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserInterface } from "../interfaces/user.interface";

export class CreateUserDto implements UserInterface{
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsBoolean()
    @IsOptional()
    state: boolean;
}
