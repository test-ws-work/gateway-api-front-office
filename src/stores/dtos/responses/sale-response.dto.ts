import { ApiProperty } from '@nestjs/swagger';

export class SaleDtoResponse {
  @ApiProperty()
  custumerId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  tax: number;

  @ApiProperty()
  saleDate: Date;

  @ApiProperty()
  products: string[];

  @ApiProperty()
  store: string;
}
