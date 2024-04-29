import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Inject,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAccountDto, ResponseAccountDto, UpdateAccountDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Account API')
@Controller('account')
export class AccountController {
  constructor(
    @Inject('ACCOUNT') private readonly tcpAccountService: ClientProxy,
  ) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get account by id',
    description: 'Returns account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  @ApiOkResponse({ type: ResponseAccountDto })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tcpAccountService.send({ cmd: 'get-account' }, id);
  }

  @Post('search')
  @ApiOperation({
    summary: 'Returns all accounts filtered by condition',
    description: 'Returns all accounts filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseAccountDto] })
  find() {
    return this.tcpAccountService.send({ cmd: 'find-accounts' }, '');
  }

  @Post('create')
  @ApiOperation({
    summary: 'Creates new account',
    description: 'Creates new account and returns its id',
  })
  @ApiBody({ type: CreateAccountDto })
  @ApiOkResponse({ type: String })
  new(@Body(ValidationPipe) createAccountDto: CreateAccountDto) {
    return this.tcpAccountService.send(
      { cmd: 'create-account' },
      createAccountDto,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updates an account by id',
    description: 'Updates an account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  @ApiBody({ type: UpdateAccountDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateAccountDto: UpdateAccountDto,
  ) {
    return this.tcpAccountService.send({ cmd: 'update-account' }, [
      id,
      updateAccountDto,
    ]);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes an account by id',
    description: 'Deletes an account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.tcpAccountService.send({ cmd: 'delete-account' }, id);
  }
}
