import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { ClientModule } from '../client/client.module';
import { ProductModule } from '../product/product.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Order
        ]),
        ClientModule,
        ProductModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule { }
