import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StoresService } from '../services/stores.service';
import { StoreDtoRequest } from '../dtos/requests/store-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreDtoResponse } from '../dtos/responses/store-response.dto';

@ApiTags('Stores')
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
  create(@Body() dto: StoreDtoRequest): Promise<StoreDtoResponse> {
    return this.storesService.create(dto);
  }

  @Get('by-user')
  @ApiResponse({
    status: 200,
    description: 'Search store by user',
    type: StoreDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  findAllByUser(): Promise<StoreDtoResponse[]> {
    return this.storesService.findAllByUser();
  }

  @Get('by-store')
  @ApiResponse({
    status: 200,
    description: 'Search store by id',
    type: StoreDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  searchById(@Query('storeId') storeId: string): Promise<StoreDtoResponse> {
    return this.storesService.searchById(+storeId);
  }

  @Delete(':storeId')
  @ApiResponse({ status: 204, description: 'Remove store' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  remove(@Param('storeId') storeId: string) {
    return this.storesService.remove(+storeId);
  }
}
