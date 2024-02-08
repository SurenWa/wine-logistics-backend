// model Products {
//     id                      Int            @id @default(autoincrement())
//     name                    String?
//     year                    Int?
//     barCode                 Int?
//     isActive                Boolean        @default(true)
//     costPriceExcludingVat   Int?
//     markupPercent           Int?
//     retailPriceExcludingVat Int?
//     retailPriceIncludingVat Int?
//     stockBalance            Int?
//     minimumStockBalance     Int?
//     maximumStockBalance     Int?
//     manufacturer            Manufacturers? @relation(fields: [manufacturerId], references: [id], onDelete: SetNull)
//     manufacturerId          Int?
//     category                Categories?    @relation(fields: [categoryId], references: [id], onDelete: SetNull)
//     categoryId              Int?
//     supplier                Suppliers?     @relation(fields: [supplierId], references: [id], onDelete: SetNull)
//     supplierId              Int?
//     business                Businesses?    @relation(fields: [businessId], references: [id], onDelete: Cascade)
//     businessId              Int?
//     createdBy               String?
//     createdAt               DateTime       @default(now())
//     updatedAt               DateTime       @updatedAt
// }

import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MaxLength(300)
    @ApiProperty({ required: true })
    name?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    year?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    barCode?: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, default: true })
    isActive?: boolean;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    costPriceExcludingVat?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    retailPriceExcludingVat?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    stockBalance?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    minimumStockBalance?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    maximumStockBalance?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    manufacturerId?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    supplierId?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    categoryId?: number;
}
