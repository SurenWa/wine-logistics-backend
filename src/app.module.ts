import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessesModule } from './superadmin/businesses/businesses.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './superadmin/users/users.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { SuppliersModule } from './admin/suppliers/suppliers.module';
import { CategoryModule } from './admin/category/category.module';
//import { SeedService } from './seed/seed.service';
import { ManufacturersModule } from './admin/manufacturers/manufacturers.module';
import { ProductsModule } from './admin/products/products.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // no need to import into other modules
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        BusinessesModule,
        PrismaModule,
        UsersModule,
        MailModule,
        AuthModule,
        SuppliersModule,
        CategoryModule,
        ProductsModule,
        ManufacturersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    //providers: [AppService, SeedService],
})
export class AppModule {}
