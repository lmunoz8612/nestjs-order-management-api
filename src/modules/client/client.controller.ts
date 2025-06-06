import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client-dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/clients')
@ApiTags('Clients')
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Post()
    @ApiOperation({
        description: 'Create a new client'
    })
    @ApiBody({
        description: 'Create a new client from an Client DTO',
        type: ClientDTO,
        examples: {
            ejemplo_1: {
                value: {
                    id: 1,
                    name: 'Luis',
                    email: 'luis@outlook.com',
                    address: {
                        country: 'México',
                        province: 'Nuevo León',
                        town: 'Santa Catarina',
                        street: 'Rio Sonora 160 A'
                    }
                }
            },
            ejemplo_2: {
                value: {
                    name: 'Erick',
                    email: 'erick@outlook.com',
                    address: {
                        country: 'México',
                        province: 'Nuevo León',
                        town: 'Santa Catarina',
                        street: 'Rio Sonora 170 A'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: '<small>Client created successfully.</small>'
    })
    @ApiResponse({
        status: 409,
        description: '<small>Client id {x} already exists</small><br /><small>Email {x} already exists</small><br /><small>Address already exists</small>'
    })
    createClient(@Body() client: ClientDTO) {
        return this.clientService.createClient(client);
    }

    @Get()
    @ApiOperation({
        description: 'Get all clients and addresses'
    })
    @ApiResponse({
        status: 200,
        description: '<small>Get all clients and addresses</small>'
    })
    getClients() {
        return this.clientService.getClients();
    }

    @Get('/:id')
    @ApiOperation({
        description: 'Get client info by id'
    })
    @ApiResponse({
        status: 200,
        description: '<small>Get client info by id</small>'
    })
    getClientById(@Param('id') id: Number) {
        return this.clientService.getClientById(id);
    }

    @Put()
    @ApiOperation({
        description: 'Update client info'
    })
    @ApiBody({
        description: 'Client info from an Client DTO',
        type: ClientDTO,
        examples: {
            ejemplo_1: {
                value: {
                    id: 1,
                    name: 'Erick',
                    email: 'erick@outlook.com',
                    address: {
                        id: 7,
                        country: 'México',
                        province: 'Nuevo León',
                        town: 'Santa Catarina',
                        street: 'Rio Sonora 200'
                    }
                }
            },
            ejemplo_2: {
                value: {
                    id: 2,
                    name: 'Luis',
                    email: 'luis@outlook.com',
                    address: {
                        country: 'México',
                        province: 'Nuevo León',
                        town: 'Santa Catarina',
                        street: 'Rio Sonora 150'
                    }
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: '<small>Update client info successfully</small>'
    })
    @ApiResponse({
        status: 409,
        description: '<small>Client id {x} already exists</small><br /><small>Email {x} already exists</small><br /><small>Address already exists</small>'
    })
    updateClient(@Body() client: ClientDTO) {
        return this.clientService.updateClient(client);
    }

    @Delete('/:id')
    @ApiOperation({
        description: 'Delete an client by Id'
    })
    @ApiParam({
        name: 'id',
        description: '<small>The client ID</small>',
        type: Number,
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: '<small>Client deleted successfully</small>'
    })
    @ApiResponse({
        status: 409,
        description: '<small>Client id {x} already exists</small>'
    })
    deleteClient(@Param('id') id: Number) {
        return this.clientService.deleteClient(id);
    }
}