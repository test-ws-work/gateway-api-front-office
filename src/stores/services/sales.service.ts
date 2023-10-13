import { Injectable } from '@nestjs/common';
import { SaleDtoRequest } from '../dtos/requests/sale-request.dto';
import { SaleClient } from '../clients/sale.client';

@Injectable()
export class SaleService {
  constructor(private readonly saleClient: SaleClient) {}

  async create(request: SaleDtoRequest) {
    return this.saleClient.create(request);
  }
}
