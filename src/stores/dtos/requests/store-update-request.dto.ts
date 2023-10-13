import { ApiProperty } from '@nestjs/swagger';

export class StoreUpdateDtoRequest {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  number?: number;

  @ApiProperty()
  complement?: string;

  @ApiProperty()
  neighbor?: string;

  @ApiProperty()
  state?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  country?: string;
}
