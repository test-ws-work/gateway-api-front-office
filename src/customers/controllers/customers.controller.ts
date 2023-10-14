import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CustomerDtoRequest } from '../dto/requests/customer-request.dto';
import { UpdateCustomerDto } from '../dto/requests/update-customer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerDtoResponse } from '../dto/responses/customer-response.dto';
import { CustomerLoginDtoRequest } from '../dto/requests/customer-login-request.dto';

@ApiTags('Customer')
@Controller('api/v1/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post(':storeId')
  @ApiResponse({
    status: 201,
    description: 'Create a new sale',
    type: CustomerDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  create(
    @Param('storeId') storeId: number,
    @Body() createCustomerDto: CustomerDtoRequest,
  ) {
    return this.customersService.create(storeId, createCustomerDto);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Return user to login',
    type: CustomerDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  findByEmailAndPassword(
    @Query('storeId') storeId: number,
    @Body() dto: CustomerLoginDtoRequest,
  ) {
    return this.customersService.findByEmailAndPassword(
      storeId,
      dto.email,
      dto.password,
    );
  }

  @Get(':customerId')
  @ApiResponse({
    status: 200,
    description: 'Search customer by id',
    type: CustomerDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Customer not found.' })
  findCustomerById(@Param('customerId') customerId: number) {
    return this.customersService.findCustomerById(customerId);
  }

  @Patch(':customerId')
  update(
    @Param('customerId') customerId: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(customerId, updateCustomerDto);
  }

  @Delete(':customerId')
  remove(@Param('customerId') customerId: number) {
    return this.customersService.remove(customerId);
  }
}
