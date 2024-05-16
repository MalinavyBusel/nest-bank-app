import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { CreateTransactionDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import {
  TRANSACTION_RPC_PACKAGE_NAME,
  TRANSACTION_RPC_SERVICE_NAME,
  TransactionRpcService,
} from 'common-rpc';

@ApiTags('Transaction API')
@ApiBearerAuth()
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

  @Post('create')
  @ApiOperation({
    summary: 'Creates a new transaction',
    description: 'Creates a new transaction',
  })
  @ApiBody({ type: CreateTransactionDto })
  create(@Body(ValidationPipe) createTransactionDto: CreateTransactionDto) {
    return this.transactionRpcService.create({
      data: createTransactionDto,
      payload: { clientId: '' },
    });
  }
}
