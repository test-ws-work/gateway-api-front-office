import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomersService } from 'src/customers/services/customers.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(storeId: number, { email, password }: CreateAuthDto) {
    const customer = await this.customerService.findByEmailAndPassword(
      storeId,
      email,
      password,
    );

    if (customer.statusCode === HttpStatus.UNAUTHORIZED) {
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

  checkToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
