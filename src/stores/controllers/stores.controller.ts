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
import { CustomerTypeEnum } from 'src/common/enums/customer-type.enum';
import { IsLogist } from 'src/decorators/logist.decorator';
import { LogistDtoResponse } from 'src/logists/dto/responses/logist-response.dto';

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
    @IsLogist() logist: LogistDtoResponse,
    @Body() dto: StoreDtoRequest,
  ): Promise<StoreDtoResponse> {
    if (logist.customerType === CustomerTypeEnum.ADMIN) {
      return this.storesService.create(logist.id, dto);
    } else {
      throw new ForbiddenException('Access denied.');
    }
  }

  @Get('by-user')
  @ApiResponse({
    status: 200,
    description: 'Search store by user',
    type: StoreDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  findAllByUser(
    @IsLogist() logist: LogistDtoResponse,
  ): Promise<StoreDtoResponse[]> {
    if (logist.customerType === CustomerTypeEnum.ADMIN) {
      return this.storesService.findAllByUser(logist.id);
    }
    throw new ForbiddenException('Access denied.');
  }

  @Get('by-store')
  @ApiResponse({
    status: 200,
    description: 'Search store by id',
    type: StoreDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  searchById(
    @IsLogist() logist: LogistDtoResponse,
    @Query('storeId') storeId: string,
  ): Promise<StoreDtoResponse> {
    if (logist.customerType === CustomerTypeEnum.ADMIN) {
      return this.storesService.searchById(logist.id, +storeId);
    }
    throw new ForbiddenException('Access denied.');
  }

  @Delete(':storeId')
  @ApiResponse({ status: 204, description: 'Remove store' })
  @ApiResponse({ status: 404, description: 'Store not found.' })
  remove(
    @IsLogist() logist: LogistDtoResponse,
    @Param('storeId') storeId: string,
  ) {
    if (logist.customerType === CustomerTypeEnum.ADMIN) {
      return this.storesService.remove(+storeId);
    }
    throw new ForbiddenException('Access denied.');
  }
}
