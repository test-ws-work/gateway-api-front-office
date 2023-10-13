import { ApiProperty } from '@nestjs/swagger';
import { StoreDtoResponse } from './store-response.dto';

export class ProductDtoResponse {
  @ApiProperty()
  id: number;

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
  store: StoreDtoResponse;
}
