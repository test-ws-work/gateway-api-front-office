import { ApiProperty } from '@nestjs/swagger';

export class ProductDtoRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  storeId: number;
}
