import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':storeId')
  @ApiResponse({
    status: 201,
    description: 'Return Jwt token',
    type: String,
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  signIn(
    @Param('storeId') storeId: number,
    @Body() createAuthDto: CreateAuthDto,
  ) {
    return this.authService.signIn(storeId, createAuthDto);
  }
}
