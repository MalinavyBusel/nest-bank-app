import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

@ApiTags('Client API')
@Controller('client')
export class ClientController {
  @ApiOperation({
    summary: 'Returns client',
    description: 'Returns client with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target client UUID',
  })
  @ApiOkResponse({ type: ResponseClientDto })
  @Get(':id')
  getById(@Param('id') _id: string) {}

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
  @Get(':id/transactions')
  getTransactions(@Param('id') _id: string) {}

  @ApiOperation({
    summary: 'Returns all clients accounts',
    description: 'Returns all accounts owned by client with provided UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target client UUID',
  })
  @ApiOkResponse({ type: [ResponseAccountDto] })
  @Get(':id/accounts')
  getAccounts(@Param('id') _id: string) {}

  @ApiOperation({
    summary: 'Returns all clients filtered by condition',
    description: 'Returns all clients filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseClientDto] })
  @Post('search')
  find() {}

  @ApiOperation({
    summary: 'Creates new client',
    description: 'Creates new client and an initial account for it',
  })
  @ApiBody({ type: CreateClientDto })
  @Post('create')
  new(@Body() _createClientDto: CreateClientDto) {}

  @ApiOperation({
    summary: 'Deletes a client',
    description: 'Deletes a client with the same UUID and all its accounts',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target client UUID',
  })
  @Delete(':id')
  delete(@Param('id') _id: string) {}
}
