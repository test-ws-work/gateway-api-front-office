import { Injectable } from '@nestjs/common';
import { StoreDtoRequest } from '../dtos/requests/store-request.dto';

@Injectable()
export class StoreClient {
  private hostMsStores: string = process.env.HOST_MS_STORE;

  async create(userId: number, dto: StoreDtoRequest) {
    const url = `${this.hostMsStores}/api/v1/stores/${userId}`;
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

  async findAllByUser(userId: number) {
    const response = await fetch(
      `${this.hostMsStores}/api/v1/stores/by-user/${userId}`,
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async searchById(userId: number, storeId: number) {
    const response = await fetch(
      `${this.hostMsStores}/api/v1/stores/by-store/${userId}?storeId=${storeId}`,
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async delete(storeId: number) {
    await fetch(`${this.hostMsStores}/api/v1/stores/${storeId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }
}
