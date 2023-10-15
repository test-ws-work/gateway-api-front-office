import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { ProductDtoResponse } from '../dtos/responses/product-response.dto';
import { ProductDtoRequest } from '../dtos/requests/product-request.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { IsLogist } from 'src/decorators/logist.decorator';
import { LogistDtoResponse } from 'src/logists/dto/responses/logist-response.dto';

@ApiTags('Products')
@UseGuards(AuthGuard)
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Create a new store',
    type: ProductDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  create(
    @IsLogist() logist: LogistDtoResponse,
    @Body() product: ProductDtoRequest,
  ) {
    return this.productService.create(logist.id, product);
  }

  @Get('by-product/:productId')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ProductDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findProductById(@Param('productId') productId: string) {
    return this.productService.findProductById(+productId);
  }

  @Get('by-store/:storeId')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ProductDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  searchAllProductsByStore(
    @Param('storeId') storeId: number,
    @Query('page') page = 1,
    @Query('size') size = 10,
  ) {
    return this.productService.searchAllProductsByStore(storeId, page, size);
  }

  @Get(':storeId/by-brand')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: ProductDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  searchAllProductsByBrand(
    @Param('storeId') storeId: number,
    @Query('brand') brand: string,
    @Query('page') page = 1,
    @Query('size') size = 10,
  ) {
    return this.productService.searchAllProductsByBrand(
      storeId,
      brand,
      page,
      size,
    );
  }

  @Patch(':productId')
  @ApiResponse({
    status: 201,
    description: 'Create a new store',
    type: ProductDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(
    @Param('productId') productId: number,
    @Body() product: ProductDtoRequest,
  ) {
    return this.productService.update(productId, product);
  }

  @Delete(':productId')
  @ApiResponse({ status: 204, description: 'Remove product' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  delete(@Param('productId') productId: number) {
    return this.productService.delete(productId);
  }
}
