import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBankDto, ResponseBankDto, UpdateBankDto } from './dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Bank API')
@Controller('bank')
export class BankController {
  @ApiOperation({
    summary: 'Returns bank object',
    description: 'Returns bank with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target bank UUID',
  })
  @ApiOkResponse({ type: ResponseBankDto })
  @Get(':id')
  getById(@Param('id') _id: string) {}

  @ApiOperation({
    summary: 'Returns all banks filtered by condition',
    description: 'Returns all banks filtered by condition',
  })
  @ApiOkResponse({ type: [ResponseBankDto] })
  @Post('search')
  find() {}

  @ApiOperation({
    summary: 'Creates new bank',
    description: 'Creates new bank',
  })
  @ApiBody({ type: CreateBankDto })
  @Post('')
  new(@Body() _createBankDto: CreateBankDto) {}

  @ApiOperation({
    summary: 'updates a bank',
    description: 'updates a bank with the same UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target bank UUID',
  })
  @ApiBody({ type: UpdateBankDto })
  @Patch(':id')
  update(@Param('id') _id: string, @Body() _updateBankDto: UpdateBankDto) {}

  @ApiOperation({
    summary: 'Deletes a bank',
    description: 'Deletes a bank with the same UUID and all its accounts',
  })
  @ApiParam({
    name: 'id',
    description: 'the string representation of the target bank UUID',
  })
  @Delete(':id')
  delete(@Param('id') _id: string) {}
}
