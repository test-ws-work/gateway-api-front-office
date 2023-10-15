import { Injectable } from '@nestjs/common';
import { LogistDtoRequest } from '../dto/requests/logist-request.dto';
import { LogistLoginDtoRequest } from '../dto/requests/logist-login-request.dto';

@Injectable()
export class LogistClient {
  private hostMsLogist: string = process.env.HOST_MS_LOGIST;

  async create(dto: LogistDtoRequest) {
    const url = `${this.hostMsLogist}/api/v1/logists`;
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

  async findById(logistId: number) {
    const response = await fetch(
      `${this.hostMsLogist}/api/v1/logists/${logistId}`,
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }

  async update(logistId: number, dto: LogistDtoRequest) {
    const url = `${this.hostMsLogist}/api/v1/logists/${logistId}`;
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

  async remove(logistId: number) {
    return await fetch(`${this.hostMsLogist}/api/v1/logists/${logistId}`, {
      method: 'DELETE',
    })
      .then((res) => res)
      .catch((err) => console.error(err));
  }

  async findByEmailAndPassword(email: string, password: string) {
    const logist: LogistLoginDtoRequest = {
      email,
      password,
    };

    const url = `${this.hostMsLogist}/api/v1/logists/search-by-email-password`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logist),
    };

    const response = await fetch(url, requestOptions)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return response;
  }
}
