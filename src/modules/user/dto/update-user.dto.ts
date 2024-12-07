import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';

export class UpdateUserDto implements UserInterface {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    username: string;
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    email: string;
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    password: string;
    @IsBoolean()
    @IsOptional()
    state: boolean;
}
