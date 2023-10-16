import { Injectable } from '@nestjs/common';
import { ProductDtoRequest } from '../dtos/requests/product-request.dto';

@Injectable()
export class ProductClient {
  private hostMsStores: string = process.env.HOST_MS_STORE;

  async create(userId: number, dto: ProductDtoRequest) {
    const url = `${this.hostMsStores}/api/v1/products/${userId}`;
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

  async findProductById(productId: number) {
    const response = await fetch(
      `${this.hostMsStores}/api/v1/products/by-product/${productId}`,
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async searchAllProductsByStore(storeId: number, page: number, size: number) {
    const response = await fetch(
      `${this.hostMsStores}/api/v1/products/by-store/${storeId}?page=${page}&size=${size}`,
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async searchAllProductsByBrand(
    storeId: number,
    brand: string,
    page: number,
    size: number,
  ) {
    const response = await fetch(
      `${this.hostMsStores}/api/v1/products/${storeId}/by-brand?brand=${brand}&page=${page}&size=${size}`,
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async update(productId: number, dto: ProductDtoRequest) {
    const url = `${this.hostMsStores}/api/v1/products/${productId}`;
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

  async delete(productId: number) {
    await fetch(`${this.hostMsStores}/api/v1/products/${productId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }
}
