import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @MaxLength(300)
    @IsOptional()
    @ApiProperty({ required: false })
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
    @ApiProperty({ required: false })
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
