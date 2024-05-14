import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { CreateClientDto, ResponseClientDto } from './dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseTransactionDto } from '../transaction/dto';
import { ResponseAccountDto } from '../account/dto';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CLIENT_RPC_PACKAGE_NAME,
  CLIENT_RPC_SERVICE_NAME,
  ACCOUNT_RPC_PACKAGE_NAME,
  ACCOUNT_RPC_SERVICE_NAME,
  AccountRpcService,
  ClientRpcService,
  TRANSACTION_RPC_PACKAGE_NAME,
  TRANSACTION_RPC_SERVICE_NAME,
  TransactionRpcService,
} from 'common-rpc';
import { GetTransactionsDto } from './dto/getTransactions.client.dto';
import { IdExtractorService } from '../../common/id-extractor/id-extractor.service';
import { Request } from 'express';
import { Public } from '../../common/auth.guard';

@ApiTags('Client API')
@ApiBearerAuth()
@Controller('client')
export class ClientController {
  private clientRpcService: ClientRpcService;

  private accountRpcService: AccountRpcService;

  private transactionRpcService: TransactionRpcService;

  constructor(
    @Inject(CLIENT_RPC_PACKAGE_NAME) private readonly clientClient: ClientGrpc,
    @Inject(ACCOUNT_RPC_PACKAGE_NAME)
    private readonly accountClient: ClientGrpc,
    @Inject(TRANSACTION_RPC_PACKAGE_NAME)
    private readonly transactionClient: ClientGrpc,
    private readonly idExtractorService: IdExtractorService,
  ) {}

  onModuleInit() {
    this.clientRpcService = this.clientClient.getService<ClientRpcService>(
      CLIENT_RPC_SERVICE_NAME,
    );
    this.accountRpcService = this.accountClient.getService<AccountRpcService>(
      ACCOUNT_RPC_SERVICE_NAME,
    );
    this.transactionRpcService =
      this.transactionClient.getService<TransactionRpcService>(
        TRANSACTION_RPC_SERVICE_NAME,
      );
  }

  @Get('get')
  @ApiOperation({
    summary: 'Get client by id from token',
    description: 'Returns client with the same UUID',
  })
  @ApiOkResponse({ type: ResponseClientDto })
  getById(@Req() request: Request) {
    const id = this.idExtractorService.getClientIdFromAccessToken(request);
    return this.clientRpcService.get({ id });
  }

  @Get('transactions')
  @ApiOperation({
    summary: 'Returns all clients transactions',
    description:
      'Returns all transactions that was initiated by client with provided UUID',
  })
  @ApiQuery({
    required: false,
    name: 'startDate',
    description: 'all returned transactions will be younger than startDate',
  })
  @ApiQuery({
    required: false,
    name: 'endDate',
    description: 'all returned transactions will be older than endDate',
  })
  @ApiOkResponse({ type: [ResponseTransactionDto] })
  getTransactions(
    @Query(ValidationPipe) params: GetTransactionsDto,
    @Req() request: Request,
  ) {
    const id = this.idExtractorService.getClientIdFromAccessToken(request);
    return this.transactionRpcService.getClientTransactions({
      clientId: id,
      endDate: params.endDate,
      startDate: params.startDate,
    });
  }

  // @Get(':id/accounts')
  // @ApiParam({
  //   name: 'id',
  //   description: 'the string representation of the target client UUID',
  // })
  @Get('accounts')
  @ApiOperation({
    summary: 'Returns all clients accounts',
    description: 'Returns all accounts owned by client with provided UUID',
  })
  @ApiOkResponse({ type: [ResponseAccountDto] })
  getAccounts(@Req() request: Request) {
    const id = this.idExtractorService.getClientIdFromAccessToken(request);
    return this.accountRpcService.getClientAccounts({ id });
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

  @Public()
  @Post('create')
  @ApiOperation({
    summary: 'Creates new client',
    description: 'Creates new client and an initial account for it',
  })
  @ApiBody({ type: CreateClientDto })
  create(@Body(ValidationPipe) createClientDto: CreateClientDto) {
    return this.clientRpcService.create(createClientDto);
  }

  @Delete('delete')
  @ApiOperation({
    summary: 'Deletes a client by id from token',
    description: 'Deletes a client with the same UUID and all its accounts',
  })
  delete(@Req() request: Request) {
    const id = this.idExtractorService.getClientIdFromAccessToken(request);
    return this.clientRpcService.delete({ id });
  }
}
