import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './dto';
import { Public } from '../../common/auth.guard';
import {
  AUTH_RPC_PACKAGE_NAME,
  AUTH_RPC_SERVICE_NAME,
  AuthRpcService,
} from 'common-rpc';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  private authRpcService: AuthRpcService;

  constructor(
    @Inject(AUTH_RPC_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.authRpcService = this.client.getService<AuthRpcService>(
      AUTH_RPC_SERVICE_NAME,
    );
  }

  @Public()
  @Post('login')
  @ApiOperation({
    description: 'Returns jwt token',
  })
  @ApiBody({ type: LoginDto })
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    try {
      return await this.authRpcService.login(loginDto);
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}
