import { ApiProperty } from '@nestjs/swagger';

export class CustomerDtoRequest {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
