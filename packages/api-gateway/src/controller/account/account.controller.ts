import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Inject,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountDto, ResponseAccountDto, UpdateAccountDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ACCOUNT_RPC_PACKAGE_NAME,
  ACCOUNT_RPC_SERVICE_NAME,
  AccountRpcService,
} from 'common-rpc';

@ApiTags('Account API')
@Controller('account')
export class AccountController {
  private accountRpcService: AccountRpcService;

  constructor(
    @Inject(ACCOUNT_RPC_PACKAGE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.accountRpcService = this.client.getService<AccountRpcService>(
      ACCOUNT_RPC_SERVICE_NAME,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get account by id',
    description: 'Returns account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  @ApiOkResponse({ type: ResponseAccountDto })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountRpcService.get({ id });
  }

  @Post('search')
  @ApiOperation({
    summary: 'Returns all accounts filtered by condition',
    description: 'Returns all accounts filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseAccountDto] })
  find() {
    return this.accountRpcService.find({});
  }

  @Post('create')
  @ApiOperation({
    summary: 'Creates new account',
    description: 'Creates new account and returns its id',
  })
  @ApiBody({ type: CreateAccountDto })
  @ApiOkResponse({ type: String })
  create(@Body(ValidationPipe) createAccountDto: CreateAccountDto) {
    return this.accountRpcService.create(createAccountDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates an account by id',
    description: 'Updates an account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  @ApiBody({ type: UpdateAccountDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountRpcService.update({ id, ...updateAccountDto });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes an account by id',
    description: 'Deletes an account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountRpcService.delete({ id });
  }
}
