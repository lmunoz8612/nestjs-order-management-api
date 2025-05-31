import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { ClientModule } from './modules/client/client.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "root",
            "password": "Kingdiamond2025*",
            "database": "shop",
            "entities": ["dist/**/*.entity{.ts,.js}"],
            "synchronize": true
        }),
        ProductModule,
        ClientModule,
        OrdersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
