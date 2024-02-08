import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

// model Businesses {
//     id              Int      @id @default(autoincrement())
//     businessName    String   @unique
//     businessAddress String?
//     businessNumber  Int?
//     telephoneNumber String?
//     isActive        Boolean  @default(true)
//     createdAt       DateTime @default(now())
//     updatedAt       DateTime @updatedAt
// }

export class CreateBusinessDto {
    @IsString()
    @IsNotEmpty({ message: 'Businessname is required' })
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
}
