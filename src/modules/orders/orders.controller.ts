import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDTO } from './dto/order-dto';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/orders')
export class OrdersController {
    constructor(private orderService: OrdersService) { }

    @Post()
    @ApiOperation({
        description: 'Create a new purchase order'
    })
    @ApiBody({
        description: 'Create a new purchase order from an Order DTO',
        type: OrderDTO,
        examples: {
            ejemplo_1: {
                value: {
                    client: {
                        id: 1
                    },
                    products: [
                        {
                            id: 1
                        },
                        {
                            id: 2
                        }
                    ]
                }
            },
            ejemplo_2: {
                value: {
                    confirmAt: '2025-06-05',
                    client: {
                        id: 1
                    },
                    products: [
                        {
                            id: 1
                        },
                        {
                            id: 2
                        }
                    ]
                }
            },
        }
    })
    @ApiResponse({
        status: 201,
        description: 'Order created successfully.'
    })
    @ApiResponse({
        status: 409,
        description: '<small>Client id {x} already exists</small><br /><small>Each product must have an ID</small><br /><small>Product id {x}} not exists</small>'
    })
    createOrder(@Body() order: OrderDTO) {
        return this.orderService.createOrder(order);
    }

    @Get('/pendings')
    @ApiOperation({
        description: 'Get all orders marked as pending (confirmAt is null)'
    })
    @ApiResponse({
        status: 200,
        description: 'Get all orders marked as pending'
    })
    getPendingOrders() {
        return this.orderService.getPendingOrders();
    }

    @Get('/confirmed')
    @ApiOperation({
        description: 'Get all orders marked as confirmed (confirmAt is not null)'
    })
    @ApiQuery({
        name: 'start',
        description: 'Start date range',
        type: Date,
        required: false
    })
    @ApiQuery({
        name: 'end',
        description: 'End date range',
        type: Date,
        required: false
    })
    @ApiResponse({
        status: 200,
        description: 'Get all orders marked as confirmed'
    })
    getConfirmedOrders(@Query('start', ParseDatePipe) start: Date, @Query('end', ParseDatePipe) end: Date) {
        return this.orderService.getConfirmedOrders(start, end);
    }

    @Get('/client/:clientId')
    @ApiOperation({
        description: "Gets a customer's orders by ID"
    })
    @ApiParam({
        name: 'clientId',
        description: '<small>The client ID</small>',
        type: Number,
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: "Gets a customer's orders"
    })
    getOrdersByClient(@Param('clientId') clientId: Number) {
        return this.orderService.getOrdersByClient(clientId);
    }

    @Get('/:id')
    @ApiOperation({
        description: 'Get order info by ID (UUID)'
    })
    @ApiParam({
        name: 'id',
        description: '<small>The order ID (UUID)</small>',
        type: String,
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: 'The order info'
    })
    getOrderById(@Param('id') id: String) {
        return this.orderService.getOrderById(id);
    }

    @Patch('/confirm/:id')
    @ApiOperation({
        description: 'Confirm a existing order by ID (UUID)'
    })
    @ApiParam({
        name: 'id',
        description: '<small>The order ID (UUID)</small>',
        type: String,
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: 'Order confirmed successfully.'
    })
    @ApiResponse({
        status: 409,
        description: '<small>Order id {x} not exists</small><br /><small>Order id {x} is already confirmed</small>'
    })
    confirmOrder(@Param('id') id: String) {
        return this.orderService.confirmOrder(id);
    }
}
