import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

function convertPrismaDecimalToNumber(
    decimal: Prisma.Decimal | null,
): number | null {
    if (!decimal) return null;
    return (
        Number(`${decimal.s}.${decimal.d.join('')}`) * Math.pow(10, decimal.e)
    );
}

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}
    async createProduct(
        userId: number,
        businessId: number,
        createProductDto: CreateProductDto,
    ): Promise<{ message: string }> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (user.businessId !== businessId) {
                throw new UnauthorizedException('ACCESS DENIED');
            }

            const markupPercent =
                ((Number(createProductDto.retailPriceExcludingVat) -
                    Number(createProductDto.costPriceExcludingVat)) /
                    Number(createProductDto.costPriceExcludingVat)) *
                100;

            //console.log(markupPercent);

            const retailPriceIncludingVat =
                createProductDto.retailPriceExcludingVat +
                (25 / 100) * createProductDto.retailPriceExcludingVat;

            const createProduct = await this.prisma.products.create({
                data: {
                    ...createProductDto,
                    businessId,
                    markupPercent: markupPercent,
                    retailPriceIncludingVat: retailPriceIncludingVat,
                    createdBy: user.username,
                },
            });

            if (!createProduct) {
                throw new NotFoundException('Product creation denied');
            }
            return { message: 'Product created successfully' };
        } catch (error) {
            //console.log(error);
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findAllProducts(
        userId: number,
        businessId: number,
        search: string,
        page: number,
        rowsPerPage: number,
    ) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (user.businessId !== businessId) {
                throw new UnauthorizedException('ACCESS DENIED');
            }

            const offset = (page - 1) * rowsPerPage;

            const query: Prisma.ProductsFindManyArgs = {
                where: {
                    businessId,
                    name: { contains: search },
                },
                orderBy: {
                    name: 'asc',
                },
                skip: offset,
                take: rowsPerPage,
            };

            const products = await this.prisma.products.findMany(query);

            if (!products) {
                throw new NotFoundException('Suppliers not found');
            }

            const serializedProducts = products.map((product) => ({
                ...product,
                costPriceExcludingVat: convertPrismaDecimalToNumber(
                    product.costPriceExcludingVat,
                ),
                markupPercent: convertPrismaDecimalToNumber(
                    product.markupPercent,
                ),
                retailPriceExcludingVat: convertPrismaDecimalToNumber(
                    product.retailPriceExcludingVat,
                ),
                retailPriceIncludingVat: convertPrismaDecimalToNumber(
                    product.retailPriceIncludingVat,
                ),
                barCode: String(product.barCode), // Convert BigInt to string
                // Add conversions for other BigInt properties if needed
            }));

            const totalCount = await this.prisma.products.count({
                where: query.where,
            });

            const totalPages = Math.ceil(totalCount / rowsPerPage);

            return {
                serializedProducts,
                pagination: { page, rowsPerPage, totalPages, totalCount },
            };
        } catch (error) {
            //console.log(error);
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findOneProduct(userId: number, businessId: number, id: number) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new Error('User not found');
            }

            if (user.businessId !== businessId) {
                throw new UnauthorizedException('ACCESS DENIED');
            }

            const product = await this.prisma.products.findUnique({
                where: { id: id },
            });

            if (!product) {
                throw new Error('Product not found');
            }

            const serializedProduct = {
                ...product,
                costPriceExcludingVat: convertPrismaDecimalToNumber(
                    product.costPriceExcludingVat,
                ),
                markupPercent: convertPrismaDecimalToNumber(
                    product.markupPercent,
                ),
                retailPriceExcludingVat: convertPrismaDecimalToNumber(
                    product.retailPriceExcludingVat,
                ),
                retailPriceIncludingVat: convertPrismaDecimalToNumber(
                    product.retailPriceIncludingVat,
                ),
                barCode: product.barCode.toString(),
            };

            return serializedProduct;
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateProduct(
        userId: number,
        businessId: number,
        id: number,
        updateProductDto: UpdateProductDto,
    ): Promise<{ message: string }> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new Error('User not found');
            }

            if (user.businessId !== businessId) {
                throw new UnauthorizedException('ACCESS DENIED');
            }

            const markupPercent =
                ((Number(updateProductDto.retailPriceExcludingVat) -
                    Number(updateProductDto.costPriceExcludingVat)) /
                    Number(updateProductDto.costPriceExcludingVat)) *
                100;

            //console.log(markupPercent);

            const retailPriceIncludingVat =
                updateProductDto.retailPriceExcludingVat +
                (25 / 100) * updateProductDto.retailPriceExcludingVat;

            const updatedProduct = await this.prisma.products.update({
                where: { id },
                data: {
                    ...updateProductDto,
                    businessId,
                    markupPercent: markupPercent,
                    retailPriceIncludingVat: retailPriceIncludingVat,
                    createdBy: user.username,
                },
            });

            if (!updatedProduct) {
                throw new Error('Product not found');
            }

            return {
                message: 'Product updated Successfully',
            };
        } catch (error) {
            //console.log(error);
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async removeProduct(
        userId: number,
        businessId: number,
        id: number,
    ): Promise<{ message: string }> {
        // console.log(userId);
        // console.log(businessId);

        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                throw new Error('User not found');
            }

            if (user.businessId !== businessId) {
                throw new UnauthorizedException('ACCESS DENIED');
            }

            await this.prisma.products.delete({
                where: { id },
            });
            return {
                message: 'Product deleted successfully',
            };
        } catch (error) {
            //console.log(error);
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
