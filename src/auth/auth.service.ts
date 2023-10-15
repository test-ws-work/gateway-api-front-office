import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/services/customers.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogistsService } from 'src/logists/services/logists.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly logistService: LogistsService,
    private readonly jwtService: JwtService,
  ) {}

  async signInCustomer(storeId: number, { email, password }: CreateAuthDto) {
    const customer = await this.customerService.findByEmailAndPassword(
      storeId,
      email,
      password,
    );

    if (
      customer.statusCode === HttpStatus.UNAUTHORIZED ||
      customer.statusCode === HttpStatus.BAD_REQUEST
    ) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload = {
      sub: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      customerType: customer.customerType,
      store: customer.storeId,
    };

    return {
      Bearer: this.jwtService.sign(payload),
    };
  }

  async signInLogist({ email, password }: CreateAuthDto) {
    const logist = await this.logistService.findByEmailAndPassword(
      email,
      password,
    );

    if (
      logist.statusCode === HttpStatus.UNAUTHORIZED ||
      logist.statusCode === HttpStatus.BAD_REQUEST
    ) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload = {
      sub: logist.id,
      firstName: logist.firstName,
      lastName: logist.lastName,
      customerType: logist.customerType,
      store: logist.storeId,
    };

    return {
      Bearer: this.jwtService.sign(payload),
    };
  }

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
