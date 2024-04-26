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
  @ApiOperation({
    summary: 'Returns transaction',
    description: 'Returns transaction with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target transaction UUID',
  })
  @ApiOkResponse({ type: ResponseTransactionDto })
  @Get(':id')
  getById(@Param('id') _id: string) {}

  @ApiOperation({
    summary: 'Returns all transactions  filtered by condition',
    description: 'Returns all transactions filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseTransactionDto] })
  @Post('search')
  find() {}

  @ApiOperation({
    summary: 'Creates new transaction',
    description: 'Creates new transaction',
  })
  @ApiBody({ type: CreateTransactionDto })
  @Post('create')
  new(@Body() _createTransactionDto: CreateTransactionDto) {}
}
