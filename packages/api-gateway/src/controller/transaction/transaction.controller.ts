import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import {
  TRANSACTION_RPC_PACKAGE_NAME,
  TRANSACTION_RPC_SERVICE_NAME,
  TransactionRpcService,
} from 'common-rpc';
import { Request } from 'express';
import { IdExtractorService } from '../../common/id-extractor/id-extractor.service';
import { Observable } from 'rxjs';

@ApiTags('Transaction API')
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  private transactionRpcService: TransactionRpcService;

  constructor(
    @Inject(TRANSACTION_RPC_PACKAGE_NAME) private readonly client: ClientGrpc,
    private readonly idExtractorService: IdExtractorService,
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
  async create(
    @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
    @Req() request: Request,
  ) {
    const payload = this.idExtractorService.getClientIdFromAccessToken(request);
    const a = this.transactionRpcService.create({
      data: createTransactionDto,
      payload,
    });
    return a as unknown as Observable<any>;
  }
}
