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
  getById(@Param('id') _id: string) {}

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
  getTransactions(@Param('id') _id: string) {}

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
  getAccounts(@Param('id') _id: string) {}

  @Post('search')
  @ApiOperation({
    summary: 'Returns all clients filtered by condition',
    description: 'Returns all clients filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseClientDto] })
  find() {}

  @Post('create')
  @ApiOperation({
    summary: 'Creates new client',
    description: 'Creates new client and an initial account for it',
  })
  @ApiBody({ type: CreateClientDto })
  new(@Body() _createClientDto: CreateClientDto) {}

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a client by id',
    description: 'Deletes a client with the same UUID and all its accounts',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target client UUID',
  })
  delete(@Param('id') _id: string) {}
}
