import { Injectable } from '@nestjs/common';
import { StoreDtoRequest } from '../dtos/requests/store-request.dto';
import { StoreClient } from '../clients/store.client';

@Injectable()
export class StoresService {
  constructor(private readonly storeClient: StoreClient) {}

  async create(userId: number, dto: StoreDtoRequest) {
    return this.storeClient.create(userId, dto);
  }

  findAllByUser() {
    // Buscar o id do vendedor logado após criar o AuthService e validar o token
    const userId = 1;

    return this.storeClient.findAllByUser(userId);
  }

  searchById(storeId: number) {
    // Buscar o id do vendedor logado após criar o AuthService e validar o token
    const userId = 1;

    return this.storeClient.searchById(userId, storeId);
  }

  remove(storeId: number) {
    return this.storeClient.delete(storeId);
  }
}
