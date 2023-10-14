import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaleDtoResponse } from '../dtos/responses/sale-response.dto';
import { SaleService } from '../services/sales.service';
import { SaleDtoRequest } from '../dtos/requests/sale-request.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CustomerDtoResponse } from 'src/customers/dto/responses/customer-response.dto';
import { IsCustomer } from 'src/decorators/customer.decorator';

@ApiTags('Sales')
@UseGuards(AuthGuard)
@Controller('api/v1/sales')
export class SalesController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new sale',
    type: SaleDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  create(
    @IsCustomer() customer: CustomerDtoResponse,
    @Body() request: SaleDtoRequest,
  ) {
    return this.saleService.create(customer.id, request);
  }
}
