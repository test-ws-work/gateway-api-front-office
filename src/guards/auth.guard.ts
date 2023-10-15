import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CustomersService } from 'src/customers/services/customers.service';
import { LogistsService } from 'src/logists/services/logists.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomersService,
    private readonly logistSevice: LogistsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.payload = data;
      request.customer = await this.customerService.findCustomerById(data.sub);
      request.logist = await this.logistSevice.findOne(data.sub);

      return true;
    } catch (error) {
      false;
    }
  }
}
