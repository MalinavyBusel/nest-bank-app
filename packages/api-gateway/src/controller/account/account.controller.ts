import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Body,
} from '@nestjs/common';
import { CreateAccountDto, ResponseAccountDto, UpdateAccountDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Account API')
@Controller('account')
export class AccountController {
  @ApiOperation({
    summary: 'Returns account object',
    description: 'Returns account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  @ApiOkResponse({ type: ResponseAccountDto })
  @Get(':id')
  getById(@Param('id') _id: string) {}

  @ApiOperation({
    summary: 'Returns all accounts filtered by condition',
    description: 'Returns all accounts filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseAccountDto] })
  @Post('search')
  find() {}

  @ApiOperation({
    summary: 'Creates new account',
    description: 'Creates new account and returns its id',
  })
  @ApiBody({ type: CreateAccountDto })
  @ApiOkResponse({ type: String })
  @Post('')
  new(@Body() _createAccountDto: CreateAccountDto) {}

  @ApiOperation({
    summary: 'updates an account',
    description: 'updates an account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  @ApiBody({ type: UpdateAccountDto })
  @Patch(':id')
  update(
    @Param('id') _id: string,
    @Body() _updateAccountDto: UpdateAccountDto,
  ) {}

  @ApiOperation({
    summary: 'Deletes an account',
    description: 'Deletes an account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  @Delete(':id')
  delete(@Param('id') _id: string) {}
}
