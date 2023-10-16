import { ApiProperty } from '@nestjs/swagger';

export class CustomerLoginDtoRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
