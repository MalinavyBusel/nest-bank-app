import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateTransactionDto, ResponseTransactionDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Transaction API')
@Controller('transaction')
export class TransactionController {
  constructor(
    @Inject('TRANSACTION') private readonly tcpTransactionService: ClientProxy,
  ) {}

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
  getById(@Param('id') id: string) {
    return this.tcpTransactionService.send({ cmd: 'get-transaction' }, id);
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
  new(@Body() createTransactionDto: CreateTransactionDto) {
    return this.tcpTransactionService.send(
      { cmd: 'create-transaction' },
      createTransactionDto,
    );
  }
}
