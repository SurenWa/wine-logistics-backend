import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class UpdateAdminUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    businessName: string;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    @ApiProperty({ required: false })
    businessAddress?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    businessNumber?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    telephoneNumber?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, default: true })
    isActive?: boolean = true;

    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Pin Code is required' })
    @IsNumber()
    pinCode: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;
}
