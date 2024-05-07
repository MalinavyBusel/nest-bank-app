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
import { ClientGrpc } from '@nestjs/microservices';
import {
  BANK_RPC_PACKAGE_NAME,
  BANK_RPC_SERVICE_NAME,
  BankRpcService,
} from 'common-rpc';
import { Bank } from 'common-model';

@ApiTags('Bank API')
@Controller('bank')
export class BankController {
  private bankRpcService: BankRpcService;

  constructor(
    @Inject(BANK_RPC_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.bankRpcService = this.client.getService<BankRpcService>(
      BANK_RPC_SERVICE_NAME,
    );
  }

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
  getById(@Param('id', ParseUUIDPipe) id: string): { bank: Bank | null } {
    return this.bankRpcService.get({ id });
  }

  @Post('search')
  @ApiOperation({
    summary: 'Returns all banks filtered by condition',
    description: 'Returns all banks filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseBankDto] })
  find(): { banks: Bank[] } {
    return this.bankRpcService.find({});
  }

  @Post('create')
  @ApiOperation({
    summary: 'Creates new bank',
    description: 'Creates new bank',
  })
  @ApiBody({ type: CreateBankDto })
  create(@Body(ValidationPipe) createBankDto: CreateBankDto): { id: string } {
    return this.bankRpcService.create(createBankDto);
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
  ): { affected: number } {
    return this.bankRpcService.update({ id, ...updateBankDto });
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
  delete(@Param('id', ParseUUIDPipe) id: string): { affected: number } {
    return this.bankRpcService.delete({ id });
  }
}
