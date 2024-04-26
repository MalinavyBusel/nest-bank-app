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
  getById(@Param('id') _id: string) {}

  @Post('search')
  @ApiOperation({
    summary: 'Returns all accounts filtered by condition',
    description: 'Returns all accounts filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseAccountDto] })
  find() {}

  @Post('create')
  @ApiOperation({
    summary: 'Creates new account',
    description: 'Creates new account and returns its id',
  })
  @ApiBody({ type: CreateAccountDto })
  @ApiOkResponse({ type: String })
  new(@Body() _createAccountDto: CreateAccountDto) {}

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
    @Param('id') _id: string,
    @Body() _updateAccountDto: UpdateAccountDto,
  ) {}

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes an account by id',
    description: 'Deletes an account with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target account UUID',
  })
  delete(@Param('id') _id: string) {}
}
