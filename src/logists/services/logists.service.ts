import { Injectable } from '@nestjs/common';
import { LogistDtoRequest } from '../dto/requests/logist-request.dto';
import { LogistClient } from '../clients/logist.client';

@Injectable()
export class LogistsService {
  constructor(private readonly logistClient: LogistClient) {}

  async create(dto: LogistDtoRequest) {
    return this.logistClient.create(dto);
  }

  async findOne(logistId: number) {
    return this.logistClient.findById(logistId);
  }

  update(logistId: number, dto: LogistDtoRequest) {
    return this.logistClient.update(logistId, dto);
  }

  async remove(logistId: number) {
    return this.logistClient.remove(logistId);
  }

  async findByEmailAndPassword(email: string, password: string) {
    return this.logistClient.findByEmailAndPassword(email, password);
  }
}
