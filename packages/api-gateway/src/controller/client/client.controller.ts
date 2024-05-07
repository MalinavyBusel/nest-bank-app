import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateClientDto, ResponseClientDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseTransactionDto } from '../transaction/dto';
import { ResponseAccountDto } from '../account/dto';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Client API')
@Controller('client')
export class ClientController {
  constructor(
    @Inject('CLIENT') private readonly tcpClientService: ClientProxy,
    @Inject('ACCOUNT') private readonly tcpAccountService: ClientProxy,
    @Inject('TRANSACTION') private readonly tcpTransactionService: ClientProxy,
  ) {}

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
    return this.tcpClientService.send({ cmd: 'get-client' }, id);
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
    @Param('id', ParseUUIDPipe) _id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.tcpTransactionService.send({ cmd: 'get-client-transactions' }, [
      _id,
      { startDate, endDate },
    ]);
  }

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
    return this.tcpClientService.send({ cmd: 'find-clients' }, '');
  }

  @Post('create')
  @ApiOperation({
    summary: 'Creates new client',
    description: 'Creates new client and an initial account for it',
  })
  @ApiBody({ type: CreateClientDto })
  create(@Body(ValidationPipe) createClientDto: CreateClientDto) {
    return this.tcpClientService.send(
      { cmd: 'create-client' },
      createClientDto,
    );
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
    return this.tcpClientService.send({ cmd: 'delete-client' }, id);
  }
}
