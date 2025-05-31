import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './dto/order-dto';

@Controller('api/v1/orders')
export class OrdersController {
    constructor(private orderService: OrdersService) { }

    @Post()
    createOrder(@Body() order: OrderDTO) {
        return this.orderService.createOrder(order);
    }
}
