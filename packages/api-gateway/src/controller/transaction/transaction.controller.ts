import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionDto, ResponseTransactionDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Transaction API')
@Controller('transaction')
export class TransactionController {
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
  getById(@Param('id') _id: string) {}

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
  new(@Body() _createTransactionDto: CreateTransactionDto) {}
}
