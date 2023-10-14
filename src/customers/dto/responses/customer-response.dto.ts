import { ApiProperty } from '@nestjs/swagger';
import { CustomerTypeEnum } from 'src/customers/common/enums/customer-type.enum';

export class CustomerDtoResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  customerType: CustomerTypeEnum;
}
