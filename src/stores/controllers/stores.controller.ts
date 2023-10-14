import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { StoresService } from '../services/stores.service';
import { StoreDtoRequest } from '../dtos/requests/store-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreDtoResponse } from '../dtos/responses/store-response.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { IsCustomer } from 'src/decorators/customer.decorator';
import { CustomerTypeEnum } from 'src/common/enums/customer-type.enum';
import { CustomerDtoResponse } from 'src/customers/dto/responses/customer-response.dto';

@ApiTags('Stores')
@UseGuards(AuthGuard)
@Controller('api/v1/stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new store',
    type: StoreDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  create(
    @IsCustomer() customer: CustomerDtoResponse,
    @Body() dto: StoreDtoRequest,
  ): Promise<StoreDtoResponse> {
    if (customer.customerType !== CustomerTypeEnum.ADMIN) {
      throw new ForbiddenException('Access denied.');
    }

    return this.storesService.create(customer.id, dto);
  }

  @Get('by-user')
  @ApiResponse({
    status: 200,
    description: 'Search store by user',
    type: StoreDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  findAllByUser(
    @IsCustomer() customer: CustomerDtoResponse,
  ): Promise<StoreDtoResponse[]> {
    if (customer.customerType !== CustomerTypeEnum.ADMIN) {
      throw new ForbiddenException('Access denied.');
    }
    return this.storesService.findAllByUser();
  }

  @Get('by-store')
  @ApiResponse({
    status: 200,
    description: 'Search store by id',
    type: StoreDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  searchById(
    @IsCustomer() customer: CustomerDtoResponse,
    @Query('storeId') storeId: string,
  ): Promise<StoreDtoResponse> {
    if (customer.customerType !== CustomerTypeEnum.ADMIN) {
      throw new ForbiddenException('Access denied.');
    }
    return this.storesService.searchById(+storeId);
  }

  @Delete(':storeId')
  @ApiResponse({ status: 204, description: 'Remove store' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  remove(
    @IsCustomer() customer: CustomerDtoResponse,
    @Param('storeId') storeId: string,
  ) {
    if (customer.customerType !== CustomerTypeEnum.ADMIN) {
      throw new ForbiddenException('Access denied.');
    }
    return this.storesService.remove(+storeId);
  }
}
