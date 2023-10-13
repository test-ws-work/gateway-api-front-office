import { Injectable } from '@nestjs/common';
import { SaleDtoRequest } from '../dtos/requests/sale-request.dto';

@Injectable()
export class SaleClient {
  private hostMsStores: string = process.env.HOST_MS_STORE;

  async create(dto: SaleDtoRequest) {
    const url = `${this.hostMsStores}/api/v1/sales`;
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
}
