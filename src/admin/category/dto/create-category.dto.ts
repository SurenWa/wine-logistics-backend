import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

// model Categories {
//     id              Int      @id @default(autoincrement())
//     brandName       String?
//     country         String?
//     city            String?
//     business        Businesses? @relation(fields: [businessId], references: [id], onDelete: Cascade)
//     businessId Int?
// }

export class CreateCategoryDto {
    @IsString()
    @IsOptional()
    @MaxLength(300)
    @ApiProperty({ required: false })
    brandName?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    country?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    city?: string;
}
