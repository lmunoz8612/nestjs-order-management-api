import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client-dto';

@Controller('api/v1/clients')
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Post()
    createClient(@Body() client: ClientDTO) {
        return this.clientService.createClient(client);
    }

    @Get()
    getClients() {
        return this.clientService.getClients();
    }

    @Get('/:id')
    getClientById(@Param('id') id: Number) {
        return this.clientService.getClientById(id);
    }

    @Put()
    updateClient(@Body() client: ClientDTO) {
        return this.clientService.updateClient(client);
    }

    @Delete('/:id')
    deleteClient(@Param('id') id: Number) {
        return this.clientService.deleteClient(id);
    }
}
