import { Injectable } from '@nestjs/common';
import { CustomerDtoRequest } from '../dto/requests/customer-request.dto';
import { UpdateCustomerDto } from '../dto/requests/update-customer.dto';
import { CustomerClient } from '../clients/customer.client';
import { CustomerLoginDtoRequest } from '../dto/requests/customer-login-request.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly customerClient: CustomerClient) {}

  async create(storeId: number, createCustomerDto: CustomerDtoRequest) {
    return this.customerClient.create(storeId, createCustomerDto);
  }

  async findByEmailAndPassword(
    storeId: number,
    email: string,
    password: string,
  ) {
    const customer: CustomerLoginDtoRequest = {
      email,
      password,
    };
    return this.customerClient.findByEmailAndPassword(storeId, customer);
  }

  async findCustomerById(customerId: number) {
    return this.customerClient.findCustomerById(customerId);
  }

  async update(customerId: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerClient.update(customerId, updateCustomerDto);
  }

  async remove(customerId: number) {
    return this.customerClient.delete(customerId);
  }
}
