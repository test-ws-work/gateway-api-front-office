import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaleDtoResponse } from '../dtos/responses/sale-response.dto';
import { SaleService } from '../services/sales.service';
import { SaleDtoRequest } from '../dtos/requests/sale-request.dto';

@ApiTags('Sales')
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
  create(@Body() request: SaleDtoRequest) {
    return this.saleService.create(request);
  }
}
