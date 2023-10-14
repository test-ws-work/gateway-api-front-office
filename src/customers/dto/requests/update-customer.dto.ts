import { PartialType } from '@nestjs/swagger';
import { CustomerDtoRequest } from './customer-request.dto';

export class UpdateCustomerDto extends PartialType(CustomerDtoRequest) {}
