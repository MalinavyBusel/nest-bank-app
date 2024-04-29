import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBankDto, ResponseBankDto, UpdateBankDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Bank API')
@Controller('bank')
export class BankController {
  constructor(@Inject('BANK') private readonly tcpBankService: ClientProxy) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get bank by id',
    description: 'Returns bank with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target bank UUID',
  })
  @ApiOkResponse({ type: ResponseBankDto })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tcpBankService.send({ cmd: 'get-bank' }, id);
  }

  @Post('search')
  @ApiOperation({
    summary: 'Returns all banks filtered by condition',
    description: 'Returns all banks filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseBankDto] })
  find() {
    return this.tcpBankService.send({ cmd: 'find-banks' }, '');
  }

  @Post('create')
  @ApiOperation({
    summary: 'Creates new bank',
    description: 'Creates new bank',
  })
  @ApiBody({ type: CreateBankDto })
  create(@Body(ValidationPipe) createBankDto: CreateBankDto) {
    return this.tcpBankService.send({ cmd: 'create-bank' }, createBankDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates a bank by id',
    description: 'Updates a bank with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target bank UUID',
  })
  @ApiBody({ type: UpdateBankDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBankDto: UpdateBankDto,
  ) {
    return this.tcpBankService.send({ cmd: 'update-bank' }, [
      id,
      updateBankDto,
    ]);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a bank by id',
    description: 'Deletes a bank with the same UUID and all its accounts',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target bank UUID',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.tcpBankService.send({ cmd: 'delete-bank' }, id);
  }
}
