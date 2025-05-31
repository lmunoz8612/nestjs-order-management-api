import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/product-dto';
import { StockDTO } from './dto/stock-dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async createProduct(product: ProductDTO) {
        if (typeof product.id !== 'number') {
            throw new ConflictException('Product id is required and must be a number');
        }

        const productExists = await this.findProductById(product.id);
        if (productExists) {
            throw new ConflictException(`Product id ${product.id} already exists`);
        }

        return await this.productRepository.save(product);
    }

    async findProducts() {
        return await this.productRepository.find({
            where: {
                deleted: false,
            }
        });
    }

    async findProductById(id: Number) {
        return await this.productRepository.findOne({
            where: { id }
        });
    }

    async findDeletedProducts() {
        return await this.productRepository.find({
            where: {
                deleted: true,
            }
        });
    }

    async updateProduct(product: ProductDTO) {
        return await this.productRepository.save(product);
    }

    async deleteProduct(id: Number) {
        if (typeof id !== 'number') {
            throw new ConflictException('Product id is required and must be a number');
        }

        const productExists = await this.findProductById(id);
        if (!productExists) {
            throw new ConflictException(`Product id ${id} not exists`);
        }

        if (productExists.deleted) {
            throw new ConflictException(`Product id ${id} is already deleted`);
        }

        const result = await this.productRepository.update({ id }, { deleted: true, });
        if (result.affected === 1) {
            return {
                message: 'Product deleted successfully.'
            }
        }
    }

    async restoreProduct(id: Number) {
        if (typeof id !== 'number') {
            throw new ConflictException('Product id is required and must be a number');
        }

        const productExists = await this.findProductById(id);
        if (!productExists) {
            throw new ConflictException(`Product id ${id} not exists`);
        }

        if (!productExists.deleted) {
            throw new ConflictException(`Product id ${id} is not deleted`);
        }

        const result = await this.productRepository.update({ id }, { deleted: false, });
        if (result.affected === 1) {
            return {
                message: 'Product restored sucefully.'
            }
        }
    }

    async updateStock(product: StockDTO) {
        if (typeof product.id !== 'number') {
            throw new ConflictException('Product id is required and must be a number');
        }

        const productExists = await this.findProductById(product.id);
        if (!productExists) {
            throw new ConflictException(`Product id ${product.id} not exists`);
        }

        if (productExists.deleted) {
            throw new ConflictException(`Product id ${product.id} is deleted`);
        }

        const result = await this.productRepository.update({ id: product.id }, { stock: product.stock, });
        if (result.affected === 1) {
            return {
                message: 'Product stock updated successfully.'
            }
        }
    }

    async incrementStock(product: StockDTO) {
        if (typeof product.id !== 'number') {
            throw new ConflictException('Product id is required and must be a number');
        }

        const productExists = await this.findProductById(product.id);
        if (!productExists) {
            throw new ConflictException(`Product id ${product.id} not exists`);
        }

        if (productExists.deleted) {
            throw new ConflictException(`Product id ${product.id} is deleted`);
        }

        let stock = 0;
        if (Number(productExists.stock) + Number(product.stock) > 1000) {
            stock = 1000;
        }
        else {
            stock = Number(productExists.stock) + Number(product.stock);
        }

        const result = await this.productRepository.update(
            { id: product.id },
            { stock, }
        );
        if (result.affected === 1) {
            return {
                message: 'Product stock updated successfully.'
            }
        }
    }

    async decrementStock(product: StockDTO) {
        if (typeof product.id !== 'number') {
            throw new ConflictException('Product id is required and must be a number');
        }

        const productExists = await this.findProductById(product.id);
        if (!productExists) {
            throw new ConflictException(`Product id ${product.id} not exists`);
        }

        if (productExists.deleted) {
            throw new ConflictException(`Product id ${product.id} is deleted`);
        }

        let stock = 0;
        if (productExists.stock === 0) {
            throw new ConflictException(`Product id ${product.id} is out of stock`);
        }
        else if (productExists.stock < product.stock) {
            throw new ConflictException(`Product id ${product.id} is only stock in stock for ${productExists.stock}`)
        }
        else {
            stock = Number(productExists.stock) - Number(product.stock);
        }

        const result = await this.productRepository.update(
            { id: product.id },
            { stock, }
        );
        if (result.affected === 1) {
            return {
                message: 'Product stock updated successfully.'
            }
        }
    }
}
