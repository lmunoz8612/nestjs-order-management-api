import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';
import { Repository } from 'typeorm';
import { ClientDTO } from './dto/client-dto';
import { Address } from './entity/address.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,

        @InjectRepository(Address)
        private addressRepository: Repository<Address>
    ) {
    }

    async findClient(client: ClientDTO) {
        return await this.clientRepository.findOne({
            where: [
                { id: client.id },
                { email: client.email }
            ]
        });
    }

    async findClientById(id: any) {
        return await this.clientRepository.findOne({
            where: { id, },
        });
    }

    async findClientByEmail(email: String) {
        return await this.clientRepository.findOne({
            where: { email }
        });
    }

    async createClient(client: ClientDTO) {
        const clientExists = await this.findClient(client);
        if (clientExists?.id) {
            throw new ConflictException(`Client id ${clientExists?.id} already exists`);
        }
        else if (clientExists?.email) {
            throw new ConflictException(`Email ${client.email} already exists`);
        }

        let addressExists: Address | null = null;
        if (client.address) {
            if (client.address.id) {
                addressExists = await this.addressRepository.findOne({
                    where: {
                        id: client.address.id
                    }
                });
            }
            else {
                addressExists = await this.addressRepository.findOne({
                    where: {
                        country: client.address.country,
                        province: client.address.province,
                        town: client.address.town,
                        street: client.address.street
                    }
                });
            }
        }

        if (addressExists) {
            throw new ConflictException('Address already exists');
        }

        return this.clientRepository.save(client);
    }

    async getClients() {
        return await this.clientRepository.find();
    }

    async getClientById(id: Number) {
        return await this.clientRepository.findOne({
            where: { id, }
        });
    }

    async updateClient(client: ClientDTO) {
        if (!client.id) {
            await this.createClient(client);
            return await this.clientRepository.save(client);
        }
        
        let clientExists = await this.findClientById(client.id);
        let deleteAddress = false;

        if (clientExists) {
            let clientEmailExists = await this.findClientByEmail(client.email);
            if (clientEmailExists && client.id !== clientEmailExists.id) {
                throw new ConflictException(`Email ${client.email} already exists.`);
            }

            let addressExists: Address | null = null;
            if (client.address.id) {
                if (client.address.id !== clientExists.address.id) {
                    addressExists = await this.addressRepository.findOne({
                        where: { id: client.address.id, }
                    });
                    if (!addressExists) {
                        deleteAddress = true;
                    }
                }
            }
            else {
                addressExists = await this.addressRepository.findOne({
                    where: {
                        country: client.address.country,
                        province: client.address.province,
                        town: client.address.town,
                        street: client.address.street
                    }
                });
                if (!addressExists) {
                    deleteAddress = true;
                }
            }

            if (addressExists) {
                throw new ConflictException('Address already exists.');
            }

            const updated = await this.clientRepository.save(client);
            if (deleteAddress) {
                await this.addressRepository.delete({ id: clientExists?.address.id, });
            }
            return updated;

        }
        
        await this.createClient(client);
        return await this.clientRepository.save(client);
    }

    async deleteClient(id: Number) {
        const clientExists = await this.findClientById(id);
        if (!clientExists) {
            throw new ConflictException(`Client id ${id} not exists`);
        }
        const deleted = await this.clientRepository.delete({ id });
        if (deleted.affected === 1) {
            return await this.addressRepository.delete({ id: clientExists.address.id, })
        }
        
        return deleted;
    }
}
