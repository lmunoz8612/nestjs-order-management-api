import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { Address } from './entity/address.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Client,
            Address,
        ])
    ],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [ClientService]
})
export class ClientModule { }
