import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTransactionDto, ResponseTransactionDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import {
  TRANSACTION_RPC_PACKAGE_NAME,
  TRANSACTION_RPC_SERVICE_NAME,
  TransactionRpcService,
} from 'common-rpc';

@ApiTags('Transaction API')
@Controller('transaction')
export class TransactionController {
  private transactionRpcService: TransactionRpcService;

  constructor(
    @Inject(TRANSACTION_RPC_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.transactionRpcService = this.client.getService<TransactionRpcService>(
      TRANSACTION_RPC_SERVICE_NAME,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get transaction by id',
    description: 'Returns transaction with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target transaction UUID',
  })
  @ApiOkResponse({ type: ResponseTransactionDto })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.transactionRpcService.get({ id });
  }

  @Post('search')
  @ApiOperation({
    summary: 'Returns all transactions  filtered by condition',
    description: 'Returns all transactions filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseTransactionDto] })
  find() {}

  @Post('create')
  @ApiOperation({
    summary: 'Creates a new transaction',
    description: 'Creates a new transaction',
  })
  @ApiBody({ type: CreateTransactionDto })
  new(@Body(ValidationPipe) createTransactionDto: CreateTransactionDto) {
    return this.transactionRpcService.create(createTransactionDto);
  }
}
