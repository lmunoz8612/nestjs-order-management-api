import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product-dto';
import { StockDTO } from './dto/stock-dto';

@Controller('api/v1/products')
@ApiTags('Productos')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    @ApiOperation({
        description: 'Create a new product.'
    })
    @ApiBody({
        description: 'Create a new product',
        type: ProductDTO,
        examples: {
            ejemplo_1: {
                value: {
                    id: '1',
                    name: 'Producto 1',
                    price: 354,
                    stock: 200
                }
            },
            ejemplo_2: {
                value: {
                    name: 'Producto 2',
                    price: 550,
                    stock: 50
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: '<small>Product created successfully.</small>',
    })
    @ApiResponse({
        status: 409,
        description: '<small>Product id is required and must be a number.</small><br /><small>Product id {x} already exists.</small>',
    })
    createProduct(@Body() product: ProductDTO) {
        return this.productService.createProduct(product);
    }

    @Get()
    @ApiOperation({
        description: '<small>Get all undeleted products</small>'
    })
    @ApiResponse({
        status: 200,
        description: '<small>Get all undeleted products</small>',
    })
    getProducts() {
        return this.productService.findProducts();
    }

    @Get('/deleted')
    @ApiOperation({
        description: 'Get all deleted products'
    })
    @ApiResponse({
        status: 200,
        description: '<small>Get all deleted products</small>',
    })
    getDeletedProducts() {
        return this.productService.findDeletedProducts();
    }

    @Get('/:id')
    @ApiOperation({
        description: 'Get product info by id'
    })
    @ApiParam({
        name: 'id',
        description: 'Product id',
        required: true,
        type: Number,
    })
    @ApiResponse({
        status: 200,
        description: '<small>Get product info by id</small>',
    })
    getProductById(@Param('id') id: Number) {
        return this.productService.findProductById(id);
    }

    @Put()
    @ApiOperation({
        description: 'Update an exists product. If not exists, generate a new.'
    })
    @ApiBody({
        description: 'Update an exists product. If not exists, generate a new.',
        type: ProductDTO,
        examples: {
            ejemplo_1: {
                value: {
                    id: '1',
                    name: 'Producto 1',
                    price: 354,
                    stock: 200
                }
            },
            ejemplo_2: {
                value: {
                    name: 'Producto 2',
                    price: 550,
                    stock: 50
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: '<small>Update product successfully.</small>'
    })
    updateProduct(@Body() product: ProductDTO) {
        return this.productService.updateProduct(product);
    }

    @Delete('/:id')
    @ApiOperation({
        description: 'Execute a soft delete of an existing product.'
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Product id to deleted',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: '<small>Delete product successfully.</small>'
    })
    @ApiResponse({
        status: 409,
        description: '<small>Product id is required and must be a number.</small><br /><small>Product id {x} not exists</small><br /><small>Product id {x} is already deleted</small>'
    })
    deleteProduct(@Param('id') id: Number) {
        return this.productService.deleteProduct(id);
    }

    @Patch('/restore/:id')
    @ApiOperation({
        description: 'Restores a product marked as deleted.'
    })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Product id to restored',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: `<small>Restore product successfully.</small>`
    })
    @ApiResponse({
        status: 409,
        description: '<small>Product id is required and must be a number.</small><br /><small>Product id {x} not exists</small><br /><small>Product id {x} is not deleted</small>'
    })
    restoreProduct(@Param('id') id: Number) {
        return this.productService.restoreProduct(id);
    }

    @ApiOperation({
        description: 'Update stock of an existing product.'
    })
    @ApiBody({
        description: 'Update stock of an existing product.',
        type: StockDTO,
        examples: {
            ejemplo_1: {
                value: {
                    id: 1,
                    stock: 500
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: `<small>Product stock successfully updated.</small>`
    })
    @Patch('/stock')
    updateStock(@Body() stock: StockDTO) {
        return this.productService.updateStock(stock);
    }

    @ApiOperation({
        description: 'Increment stock of an existing product.'
    })
    @ApiBody({
        description: 'Increment stock of an existing product. Limit to Max = 1000',
        type: StockDTO,
        examples: {
            ejemplo_1: {
                value: {
                    id: 4,
                    stock: 100
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: `<small>Product stock successfully increment.</small>`
    })
    @ApiResponse({
        status: 409,
        description: '<small>Product id is required and must be a number.</small><br /><small>Product id {x} not exists</small><br /><small>Product id {x} is already deleted</small>'
    })
    @Patch('/increment-stock')
    incrementStock(@Body() stock: StockDTO) {
        return this.productService.incrementStock(stock);
    }

    @ApiOperation({
        description: 'Decrement stock of an existing product.'
    })
    @ApiBody({
        description: 'Decrement stock of an existing product. Limit to Min = 0',
        type: StockDTO,
        examples: {
            ejemplo_1: {
                value: {
                    id: 2,
                    stock: 20
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: `<small>Product stock successfully decrement.</small>`
    })
    @ApiResponse({
        status: 409,
        description: '<small>Product id is required and must be a number.</small><br /><small>Product id {x} not exists</small><br /><small>Product id {x} is already deleted</small>'
    })
    @Patch('/decrement-stock')
    decrementStock(@Body() stock: StockDTO) {
        return this.productService.decrementStock(stock);
    }
}
