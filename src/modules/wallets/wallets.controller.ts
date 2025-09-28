import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { AmountDto } from './dto/amount.dto';
import { AmountType } from './constants/amount-type.enum';

@Controller('debug/wallet')
export class WalletsController {
  constructor(private readonly wallets: WalletsService) {}

  @Get(':userId/balance')
  balance(@Param('userId', ParseIntPipe) userId: number) {
    return this.wallets.balanceByUserId(userId);
  }

  @Post(':userId/credit')
  credit(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: AmountDto,
  ) {
    return this.wallets.credit({
      userId,
      amount: dto.amount,
      reason: dto.reason,
      correlationId: dto.cid,
      type: dto.type,
    });
  }

  @Post(':userId/debit')
  debit(@Param('userId', ParseIntPipe) userId: number, @Body() dto: AmountDto) {
    return this.wallets.debit({
      userId,
      amount: dto.amount,
      reason: dto.reason,
      correlationId: dto.cid,
      type: dto.type,
    });
  }
}
