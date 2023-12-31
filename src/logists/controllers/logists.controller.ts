import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LogistsService } from '../services/logists.service';
import { LogistDtoRequest } from '../dto/requests/logist-request.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogistDtoResponse } from '../dto/responses/logist-response.dto';
import { LogistLoginDtoRequest } from '../dto/requests/logist-login-request.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { IsLogist } from 'src/decorators/logist.decorator';

@ApiTags('Logists')
@Controller('api/v1/logists')
export class LogistsController {
  constructor(private readonly logistsService: LogistsService) {}

  @ApiResponse({
    status: 201,
    description: 'Create a new logist',
    type: LogistDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid Request.' })
  @Post()
  async create(@Body() request: LogistDtoRequest) {
    return this.logistsService.create(request);
  }

  @ApiResponse({
    status: 200,
    description: 'Search logist by id',
    type: LogistDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Logist not found.' })
  @UseGuards(AuthGuard)
  @Get()
  async findOne(@IsLogist() logist: LogistDtoResponse) {
    return this.logistsService.findOne(logist.id);
  }

  @ApiResponse({
    status: 201,
    description: 'Update logist',
    type: LogistDtoResponse,
  })
  @ApiResponse({ status: 400, description: 'Invalid Request.' })
  @ApiResponse({ status: 404, description: 'Logist not found.' })
  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @IsLogist() logist: LogistDtoResponse,
    @Body() request: LogistDtoRequest,
  ) {
    return this.logistsService.update(logist.id, request);
  }

  @ApiResponse({
    status: 204,
    description: 'Remove logist',
  })
  @ApiResponse({ status: 404, description: 'Logist not found.' })
  @UseGuards(AuthGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@IsLogist() logist: LogistDtoResponse) {
    this.logistsService.remove(logist.id);
  }

  @ApiResponse({
    status: 200,
    description: 'Search logist by email and password',
    type: LogistDtoResponse,
  })
  @ApiResponse({ status: 404, description: 'Email or password invalid' })
  @Post('/search-by-email-password')
  async findByEmailAndPassword(
    @Body() { email, password }: LogistLoginDtoRequest,
  ): Promise<LogistDtoResponse> {
    return this.logistsService.findByEmailAndPassword(email, password);
  }
}
