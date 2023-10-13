import { ApiProperty } from '@nestjs/swagger';
import { StoreStatusEnum } from 'src/stores/common/enums/store-status.enum';

export class StoreDtoResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  neighbor: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  status: StoreStatusEnum;
}
