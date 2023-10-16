import { Injectable } from '@nestjs/common';
import { CustomerDtoRequest } from '../dto/requests/customer-request.dto';
import { CustomerLoginDtoRequest } from '../dto/requests/customer-login-request.dto';
import { UpdateCustomerDto } from '../dto/requests/update-customer.dto';

@Injectable()
export class CustomerClient {
  private hostMsCustomers: string = process.env.HOST_MS_CUSTOMER;

  async create(storeId: number, dto: CustomerDtoRequest) {
    const url = `${this.hostMsCustomers}/api/v1/customers/${storeId}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };

    const response = await fetch(url, requestOptions)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async findByEmailAndPassword(storeId: number, dto: CustomerLoginDtoRequest) {
    const url = `${this.hostMsCustomers}/api/v1/customers?storeId=${storeId}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };

    const response = await fetch(url, requestOptions)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async findCustomerById(customerId: number) {
    const response = await fetch(
      `${this.hostMsCustomers}/api/v1/customers/${customerId}`,
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async update(customerId: number, dto: UpdateCustomerDto) {
    const url = `${this.hostMsCustomers}/api/v1/customers/${customerId}`;
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    };

    const response = await fetch(url, requestOptions)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async delete(customerId: number) {
    await fetch(`${this.hostMsCustomers}/api/v1/customers/${customerId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }
}
