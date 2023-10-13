import { Injectable } from '@nestjs/common';
import { ProductDtoRequest } from '../dtos/requests/product-request.dto';
import { ProductClient } from '../clients/product.client';

@Injectable()
export class ProductsService {
  constructor(private readonly productClient: ProductClient) {}

  async create(product: ProductDtoRequest) {
    // Buscar o id do vendedor logado após criar o AuthService e validar o token
    const userId = 1;

    return this.productClient.create(userId, product);
  }

  async findProductById(productId: number) {
    return this.productClient.findProductById(productId);
  }

  async searchAllProductsByStore(storeId: number, page: number, size: number) {
    return this.productClient.searchAllProductsByStore(storeId, page, size);
  }

  async searchAllProductsByBrand(
    storeId: number,
    brand: string,
    page: number,
    size: number,
  ) {
    return this.productClient.searchAllProductsByBrand(
      storeId,
      brand,
      page,
      size,
    );
  }

  async update(productId: number, product: ProductDtoRequest) {
    return this.productClient.update(productId, product);
  }

  async delete(productId: number) {
    return this.productClient.delete(productId);
  }
}
