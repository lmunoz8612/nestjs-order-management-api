import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderDTO } from './dto/order-dto';
import { ProductDTO } from '../product/dto/product-dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRespository: Repository<Order>,
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

        return this.orderRespository.save(order);
    }
}
