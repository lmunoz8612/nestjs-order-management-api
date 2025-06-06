import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { IsNull, LessThanOrEqual, MoreThanOrEqual, Not, Repository, UpdateResult } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderDTO } from './dto/order-dto';
import { ProductDTO } from '../product/dto/product-dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private clientService: ClientService,
        private productService: ProductService,
    ) { }

    async createOrder(order: OrderDTO) {
        const clientExist = await this.clientService.findClientById(order.id);
        if (!clientExist) {
            throw new ConflictException(`Client id ${order.id} not exists`);
        }

        const products = order.products;
        for (let product of products) {
            if (!product?.id) {
                throw new ConflictException(`Each product must have an ID`);
            }

            const existsProduct = await this.productService.findProductById(product.id);
            if (!existsProduct) {
                throw new ConflictException(`Product id ${product.id} not exists`);
            }
        }

        return this.orderRepository.save(order);
    }

    async getOrderById(id: String) {
        return await this.orderRepository.findOne({
            where: { id }
        });
    }

    async getPendingOrders() {
        return await this.orderRepository.find({
            where: {
                confirmAt: IsNull()
            }
        });
    }

    async getConfirmedOrders(start: Date, end: Date) {
        if (start || end) {
            const query = this.orderRepository.createQueryBuilder('order')
                .leftJoinAndSelect('order.client', 'client')
                .leftJoinAndSelect('order.products', 'product')
                .orderBy('order.confirm');
            
            if (start) {
                query.andWhere({ confirm: MoreThanOrEqual(start) });
            }
            
            if (end) {
                end.setHours(24);
                end.setMinutes(59);
                end.setSeconds(59);
                end.setMilliseconds(999);
                query.andWhere({ confirm: LessThanOrEqual(end) });
            }

            return await query.getMany();
        }
        else {
            return await this.orderRepository.find({
                where: {
                    confirmAt: Not(IsNull())
                },
                order: {
                    confirmAt: 'DESC'
                }
            })
        }
    }

    async confirmOrder(id: String) {
        const orderExists = await this.orderRepository.findOne({
            where: { id }
        });
        if (!orderExists) {
            throw new ConflictException(`Order id ${id} not exists.`);
        }

        if (orderExists.confirmAt) {
            throw new ConflictException(`Order id ${id} already confirmed.`);
        }

        const result: UpdateResult = await this.orderRepository.update(
            { id },
            { confirmAt: new Date() }
        );
        if (result.affected == 1) {
            return result;
        }
    }

    async getOrdersByClient(clientId: Number) {
        return await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.client', 'client')
            .leftJoinAndSelect('order.products', 'product')
            .where('client.id = :clientId', { clientId })
            .orderBy('order.confirm')
            .getMany()
    }
}
