import { Injectable } from '@nestjs/common';
import { SaleDtoRequest } from '../dtos/requests/sale-request.dto';
import { SaleClient } from '../clients/sale.client';

@Injectable()
export class SaleService {
  constructor(private readonly saleClient: SaleClient) {}

  async create(customerId: number, request: SaleDtoRequest) {
    const dto: SaleDtoRequest = {
      costumerId: customerId,
      storeId: request.storeId,
      tax: request.tax,
      items: request.items,
    };
    return this.saleClient.create(dto);
  }
}
