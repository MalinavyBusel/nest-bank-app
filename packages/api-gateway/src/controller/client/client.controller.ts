import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateClientDto, ResponseClientDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseTransactionDto } from '../transaction/dto';
import { ResponseAccountDto } from '../account/dto';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import {
  CLIENT_RPC_PACKAGE_NAME,
  CLIENT_RPC_SERVICE_NAME,
  ClientRpcService,
} from 'common-rpc';

@ApiTags('Client API')
@Controller('client')
export class ClientController {
  private clientRpcService: ClientRpcService;

  constructor(
    @Inject(CLIENT_RPC_PACKAGE_NAME) private readonly clientClient: ClientGrpc,
    @Inject('ACCOUNT') private readonly tcpAccountService: ClientProxy,
  ) {}

  onModuleInit() {
    this.clientRpcService = this.clientClient.getService<ClientRpcService>(
      CLIENT_RPC_SERVICE_NAME,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get client by id',
    description: 'Returns client with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target client UUID',
  })
  @ApiOkResponse({ type: ResponseClientDto })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientRpcService.get({ id });
  }

  @Get(':id/transactions')
  @ApiOperation({
    summary: 'Returns all clients transactions',
    description:
      'Returns all transactions that was initiated by client with provided UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target client UUID',
  })
  @ApiOkResponse({ type: [ResponseTransactionDto] })
  getTransactions(@Param('id', ParseUUIDPipe) _id: string) {}

  @Get(':id/accounts')
  @ApiOperation({
    summary: 'Returns all clients accounts',
    description: 'Returns all accounts owned by client with provided UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target client UUID',
  })
  @ApiOkResponse({ type: [ResponseAccountDto] })
  getAccounts(@Param('id', ParseUUIDPipe) id: string) {
    return this.tcpAccountService.send({ cmd: 'get-client-accounts' }, id);
  }

  @Post('search')
  @ApiOperation({
    summary: 'Returns all clients filtered by condition',
    description: 'Returns all clients filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseClientDto] })
  find() {
    return this.clientRpcService.find({});
  }

  @Post('create')
  @ApiOperation({
    summary: 'Creates new client',
    description: 'Creates new client and an initial account for it',
  })
  @ApiBody({ type: CreateClientDto })
  create(@Body(ValidationPipe) createClientDto: CreateClientDto) {
    return this.clientRpcService.create(createClientDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a client by id',
    description: 'Deletes a client with the same UUID and all its accounts',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target client UUID',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientRpcService.delete({ id });
  }
}
