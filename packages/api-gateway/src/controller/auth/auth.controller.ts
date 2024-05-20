import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginDto } from './dto';
import { Public } from '../../common/auth.guard';
import {
  AUTH_RPC_PACKAGE_NAME,
  AUTH_RPC_SERVICE_NAME,
  AuthRpcService,
} from 'common-rpc';
import { Observable } from 'rxjs';
import { IdExtractorService } from '../../common/id-extractor/id-extractor.service';
import { Request } from 'express';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Auth API')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  private authRpcService: AuthRpcService;

  constructor(
    @Inject(AUTH_RPC_PACKAGE_NAME) private readonly client: ClientGrpc,
    private readonly idExtractorService: IdExtractorService,
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
    const a = this.authRpcService.login(loginDto);
    return a as unknown as Observable<any>;
  }

  @Public()
  @Post('refresh')
  @ApiOperation({
    description: 'Refreshes the tokens',
  })
  @ApiBody({ type: RefreshDto })
  async refresh(@Body() data: { refreshToken: string }) {
    const a = this.authRpcService.refresh(data);
    return a as unknown as Observable<any>;
  }

  @Post('logout')
  @ApiOperation({
    description: 'Invalidates users tokens',
  })
  async logout(@Req() request: Request) {
    const payload = this.idExtractorService.getClientIdFromAccessToken(request);
    return this.authRpcService.logout({ id: payload.clientId });
  }
}
