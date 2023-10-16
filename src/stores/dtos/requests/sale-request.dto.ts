import { ApiProperty } from '@nestjs/swagger';

export class SaleItemDtoRequest {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productPrice: number;
}

export class SaleDtoRequest {
  @ApiProperty()
  costumerId: number;

  @ApiProperty()
  tax: number;

  @ApiProperty()
  storeId: number;

  @ApiProperty({ type: SaleItemDtoRequest, isArray: true })
  items: SaleItemDtoRequest[];
}
